package com.nextstep.backend.agent;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AgentExecutionRepository extends JpaRepository<AgentExecution, UUID> {
    List<AgentExecution> findByTraceIdOrderByCreatedAtAsc(String traceId);
    List<AgentExecution> findByConversationIdOrderByCreatedAtAsc(UUID conversationId);
}