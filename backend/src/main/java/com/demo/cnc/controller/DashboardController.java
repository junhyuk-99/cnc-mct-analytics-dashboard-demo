package com.demo.cnc.controller;

import com.demo.cnc.dto.ApiResponse;
import com.demo.cnc.dto.CuttingRatioDto;
import com.demo.cnc.dto.DailyTrendDto;
import com.demo.cnc.dto.DashboardSummaryDto;
import com.demo.cnc.dto.StatusDistributionDto;
import com.demo.cnc.dto.UtilizationDto;
import com.demo.cnc.service.DashboardService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public ApiResponse<DashboardSummaryDto> getSummary(
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to
    ) {
        return ApiResponse.ok(dashboardService.getSummary(from, to));
    }

    @GetMapping("/utilization")
    public ApiResponse<List<UtilizationDto>> getUtilization(
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to
    ) {
        return ApiResponse.ok(dashboardService.getUtilization(from, to));
    }

    @GetMapping("/cutting-ratio")
    public ApiResponse<List<CuttingRatioDto>> getCuttingRatio(
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to
    ) {
        return ApiResponse.ok(dashboardService.getCuttingRatio(from, to));
    }

    @GetMapping("/status-distribution")
    public ApiResponse<List<StatusDistributionDto>> getStatusDistribution(
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to
    ) {
        return ApiResponse.ok(dashboardService.getStatusDistribution(from, to));
    }

    @GetMapping("/daily-trend")
    public ApiResponse<List<DailyTrendDto>> getDailyTrend(
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to
    ) {
        return ApiResponse.ok(dashboardService.getDailyTrend(from, to));
    }
}
