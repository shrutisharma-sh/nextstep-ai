package com.nextstep.backend.aiservice.resumeAnalysis;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResumeAnalysisResponse {
    @JsonProperty("resume_text")
    private String resumeText;

    private String feedback;
}