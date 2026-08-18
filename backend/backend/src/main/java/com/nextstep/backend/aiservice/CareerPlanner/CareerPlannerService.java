package com.nextstep.backend.aiservice.CareerPlanner;

import com.nextstep.backend.aiservice.careerInsights.CareerInsightsRequest;
import com.nextstep.backend.aiservice.careerInsights.CareerInsightsResponse;
import com.nextstep.backend.conversation.*;
import com.nextstep.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CareerPlannerService {

    private final RestClient aiServiceRestClient;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

    public CareerPlannerResponse getCareerAdvice(String question, User user) {


        System.out.println("Sending question: " + question);

        CareerPlannerRequest request = new CareerPlannerRequest(question);

        CareerPlannerResponse response = aiServiceRestClient.post()
                .uri("/career-planner")
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(CareerPlannerResponse.class);

        if (user != null) {
            saveConversation(user, question, response.getAnswer());
        }

        return response;
    }

    private void saveConversation(User user, String question, String answer) {
        Conversation conversation = new Conversation();
        conversation.setUser(user);
        conversation.setTitle(question.length() > 50 ? question.substring(0, 50) + "..." : question);
        conversation = conversationRepository.save(conversation);

        Message userMessage = new Message();
        userMessage.setConversation(conversation);
        userMessage.setRole(MessageRole.USER);
        userMessage.setContent(question);
        messageRepository.save(userMessage);

        Message assistantMessage = new Message();
        assistantMessage.setConversation(conversation);
        assistantMessage.setRole(MessageRole.ASSISTANT);
        assistantMessage.setContent(answer);
        messageRepository.save(assistantMessage);
    }

    public CareerInsightsResponse getCareerInsights(CareerInsightsRequest request) {
        return aiServiceRestClient.post()
                .uri("/career-insights")
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(CareerInsightsResponse.class);
    }
    public List<ConversationSummaryResponse> getRecentConversations(User user) {
        return conversationRepository.findByUserIdOrderByUpdatedAtDesc(user.getId())
                .stream()
                .map(c -> new ConversationSummaryResponse(c.getId(), c.getTitle(), c.getUpdatedAt()))
                .toList();
    }
}