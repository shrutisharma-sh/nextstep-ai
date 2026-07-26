package com.nextstep.backend.career;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CareerRoadmapRepository extends JpaRepository<CareerRoadmap, UUID> {
    List<CareerRoadmap> findByUserIdOrderByCreatedAtDesc(UUID userId);
    List<CareerRoadmap> findByConversationId(UUID conversationId);
}