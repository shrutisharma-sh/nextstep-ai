package com.nextstep.backend.aiservice.roadmapAnalysis;

import com.nextstep.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RoadmapController {

    private final RoadmapService roadmapService;

    @PostMapping("/roadmap")
    @PreAuthorize("isAuthenticated()")
    public RoadmapResponse roadmap(
            @RequestBody RoadmapRequest request,
            @AuthenticationPrincipal User user
    ) {
        return roadmapService.generateRoadmap(
                request.getCurrentSkills(),
                request.getTargetRole(),
                user
        );
    }
}