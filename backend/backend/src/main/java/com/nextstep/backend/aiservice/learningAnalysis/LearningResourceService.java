package com.nextstep.backend.aiservice.learningAnalysis;

import com.nextstep.backend.conversation.Conversation;
import com.nextstep.backend.conversation.ConversationRepository;
import com.nextstep.backend.conversation.Message;
import com.nextstep.backend.conversation.MessageRepository;
import com.nextstep.backend.conversation.MessageRole;
import com.nextstep.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

@Service
@RequiredArgsConstructor
public class LearningResourceService {

    private final RestClient aiServiceRestClient;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

    @Transactional
    public LearningResourceResponse getLearningResources(String skill, User user) {
        LearningResourceRequest request = new LearningResourceRequest(skill);

        LearningResourceResponse response = aiServiceRestClient.post()
                .uri("/learning-resource")
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(LearningResourceResponse.class);

        saveToConversation(user, skill, response.getResources());

        return response;
    }

    private void saveToConversation(User user, String skill, String resources) {
        Conversation conversation = new Conversation();
        conversation.setUser(user);
        conversation.setTitle("Learning resources: " + skill);
        conversation = conversationRepository.save(conversation);

        Message userMessage = new Message();
        userMessage.setConversation(conversation);
        userMessage.setRole(MessageRole.USER);
        userMessage.setContent("What resources should I use to learn: " + skill);
        messageRepository.save(userMessage);

        Message assistantMessage = new Message();
        assistantMessage.setConversation(conversation);
        assistantMessage.setRole(MessageRole.ASSISTANT);
        assistantMessage.setContent(resources);
        messageRepository.save(assistantMessage);
    }
}