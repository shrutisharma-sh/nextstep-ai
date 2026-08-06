package com.nextstep.backend.aiservice.resumeAnalysis;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nextstep.backend.resume.Resume;
import com.nextstep.backend.resume.ResumeRepository;
import com.nextstep.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@RequiredArgsConstructor
public class ResumeAnalysisService {

    private final RestClient aiServiceRestClient;
    private final ResumeRepository resumeRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public ResumeAnalysisResponse analyzeResume(String resumeText, User user) {
        ResumeAnalysisRequest request = new ResumeAnalysisRequest(resumeText);

        ResumeAnalysisResponse response = aiServiceRestClient.post()
                .uri("/resume-analysis")
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(ResumeAnalysisResponse.class);

        saveResume(user, resumeText, response.getFeedback());

        return response;
    }

    private void saveResume(User user, String resumeText, String feedback) {
        Resume resume = new Resume();
        resume.setUser(user);
        resume.setFileName("manual-entry.txt");
        resume.setRawText(resumeText);

        JsonNode parsedData = objectMapper.createObjectNode()
                .put("feedback", feedback);
        resume.setParsedData(parsedData);

        resumeRepository.save(resume);
    }
}