package com.nextstep.backend.conversation;

import lombok.Data;
import lombok.AllArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@AllArgsConstructor
public class ConversationSummaryResponse {
    private UUID id;
    private String title;
    private Instant updatedAt;
}