package com.nextstep.backend.career;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SkillGapRepository extends JpaRepository<SkillGap, UUID> {
    List<SkillGap> findByRoadmapId(UUID roadmapId);
}