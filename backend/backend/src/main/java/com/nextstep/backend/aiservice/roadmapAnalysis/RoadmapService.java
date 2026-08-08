package com.nextstep.backend.aiservice.roadmapAnalysis;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nextstep.backend.career.CareerRoadmap;
import com.nextstep.backend.career.CareerRoadmapRepository;
import com.nextstep.backend.career.SkillGap;
import com.nextstep.backend.career.SkillGapRepository;
import com.nextstep.backend.conversation.Conversation;
import com.nextstep.backend.conversation.ConversationRepository;
import com.nextstep.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

@Service
@RequiredArgsConstructor
public class RoadmapService {

    private final RestClient aiServiceRestClient;
    private final ConversationRepository conversationRepository;
    private final CareerRoadmapRepository careerRoadmapRepository;
    private final SkillGapRepository skillGapRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Transactional
    public RoadmapResponse generateRoadmap(String currentSkills, String targetRole, User user) {

        //Skill Gap Analysis
        SkillGapRequest skillGapRequest = new SkillGapRequest(currentSkills, targetRole);
        SkillGapResponse skillGapResponse = aiServiceRestClient.post()
                .uri("/skill-gap")
                .contentType(MediaType.APPLICATION_JSON)
                .body(skillGapRequest)
                .retrieve()
                .body(SkillGapResponse.class);

        //Roadmap Generator
        RoadmapGeneratorRequest roadmapRequest = new RoadmapGeneratorRequest(targetRole, skillGapResponse.getGapAnalysis());
        RoadmapGeneratorResponse roadmapResponse = aiServiceRestClient.post()
                .uri("/roadmap-generator")
                .contentType(MediaType.APPLICATION_JSON)
                .body(roadmapRequest)
                .retrieve()
                .body(RoadmapGeneratorResponse.class);

        //Guardrail check
        GuardrailRequest guardrailRequest = new GuardrailRequest(roadmapResponse.getRoadmap());
        GuardrailResponse guardrailResponse = aiServiceRestClient.post()
                .uri("/guardrail")
                .contentType(MediaType.APPLICATION_JSON)
                .body(guardrailRequest)
                .retrieve()
                .body(GuardrailResponse.class);

        // Save Conversation
        Conversation conversation = new Conversation();
        conversation.setUser(user);
        conversation.setTitle("Roadmap: " + targetRole);
        conversation = conversationRepository.save(conversation);

        // Save CareerRoadmap include guradrail
        JsonNode roadmapJson = objectMapper.createObjectNode()
                .put("target_role", targetRole)
                .put("gap_analysis", skillGapResponse.getGapAnalysis())
                .put("roadmap", roadmapResponse.getRoadmap())
                .put("guardrail_reasoning", guardrailResponse.getReasoning());

        CareerRoadmap careerRoadmap = new CareerRoadmap();
        careerRoadmap.setUser(user);
        careerRoadmap.setConversation(conversation);
        careerRoadmap.setRoadmapJson(roadmapJson);
        careerRoadmap = careerRoadmapRepository.save(careerRoadmap);

        //Save SkillGap
        JsonNode gapData = objectMapper.createObjectNode()
                .put("current_skills", currentSkills)
                .put("gap_analysis", skillGapResponse.getGapAnalysis());

        SkillGap skillGap = new SkillGap();
        skillGap.setRoadmap(careerRoadmap);
        skillGap.setGapData(gapData);
        skillGapRepository.save(skillGap);

        // Return only user part
        return new RoadmapResponse(targetRole, skillGapResponse.getGapAnalysis(), roadmapResponse.getRoadmap());
    }
}