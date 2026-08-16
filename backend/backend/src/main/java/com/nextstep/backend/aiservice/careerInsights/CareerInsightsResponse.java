package com.nextstep.backend.aiservice.careerInsights;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class CareerInsightsResponse {

    private String role;

    @JsonProperty("growth_percent")
    private Integer growthPercent;

    @JsonProperty("top_skills")
    private List<TopSkill> topSkills;

    @JsonProperty("top_roles")
    private List<TopRole> topRoles;

    @Data
    public static class TopSkill {
        private String name;
        private Integer percent;
    }

    @Data
    public static class TopRole {
        private String name;
        private String description;
    }
}