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
public class GuardrailResponse {
    private String roadmap;

    @JsonProperty("risk_level")
    private String riskLevel;

    private String reasoning;
}