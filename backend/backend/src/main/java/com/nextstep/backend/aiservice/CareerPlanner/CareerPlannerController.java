package com.nextstep.backend.aiservice.CareerPlanner;

import com.nextstep.backend.aiservice.careerInsights.CareerInsightsRequest;
import com.nextstep.backend.aiservice.careerInsights.CareerInsightsResponse;
import com.nextstep.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CareerPlannerController {

    private final CareerPlannerService careerPlannerService;

    @PostMapping("/career-planner")
    public CareerPlannerResponse careerPlanner(
            @RequestBody CareerPlannerRequest request,
            @AuthenticationPrincipal User user
    ) {
        return careerPlannerService.getCareerAdvice(request.getQuestion(), user);
    }

    @PostMapping("/career-insights")
    public ResponseEntity<CareerInsightsResponse> careerInsights(@RequestBody CareerInsightsRequest request) {
        CareerInsightsResponse response = careerPlannerService.getCareerInsights(request);
        return ResponseEntity.ok(response);
    }
}