package com.nextstep.backend.aiservice.roadmapAnalysis;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SkillGapRequest {
    @JsonProperty("current_skills")
    private String currentSkills;

    @JsonProperty("target_role")
    private String targetRole;
}