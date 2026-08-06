package com.nextstep.backend.aiservice.resumeAnalysis;

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
public class ResumeAnalysisController {

    private final ResumeAnalysisService resumeAnalysisService;

    @PostMapping("/resume-analysis")
    @PreAuthorize("isAuthenticated()")
    public ResumeAnalysisResponse resumeAnalysis(
            @RequestBody ResumeAnalysisRequest request,
            @AuthenticationPrincipal User user
    ) {
        return resumeAnalysisService.analyzeResume(request.getResumeText(), user);
    }
}