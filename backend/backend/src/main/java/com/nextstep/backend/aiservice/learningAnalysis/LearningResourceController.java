package com.nextstep.backend.aiservice.learningAnalysis;

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
public class LearningResourceController {

    private final LearningResourceService learningResourceService;

    @PostMapping("/learning-resource")
    @PreAuthorize("isAuthenticated()")
    public LearningResourceResponse learningResource(
            @RequestBody LearningResourceRequest request,
            @AuthenticationPrincipal User user
    ) {
        return learningResourceService.getLearningResources(request.getSkill(), user);
    }
}