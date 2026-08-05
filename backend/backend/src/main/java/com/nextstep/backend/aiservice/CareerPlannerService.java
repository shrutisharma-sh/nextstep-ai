package com.nextstep.backend.aiservice;

import com.nextstep.backend.conversation.Conversation;
import com.nextstep.backend.conversation.ConversationRepository;
import com.nextstep.backend.conversation.Message;
import com.nextstep.backend.conversation.MessageRepository;
import com.nextstep.backend.conversation.MessageRole;
import com.nextstep.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@RequiredArgsConstructor
public class CareerPlannerService {

    private final RestClient aiServiceRestClient;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

    public CareerPlannerResponse getCareerAdvice(String question, User user) {
        CareerPlannerRequest request = new CareerPlannerRequest(question);

        CareerPlannerResponse response = aiServiceRestClient.post()
                .uri("/career-planner")
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
}