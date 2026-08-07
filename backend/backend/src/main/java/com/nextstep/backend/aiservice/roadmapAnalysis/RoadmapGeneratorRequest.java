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
public class RoadmapGeneratorRequest {
    @JsonProperty("target_role")
    private String targetRole;

    @JsonProperty("gap_analysis")
    private String gapAnalysis;
}