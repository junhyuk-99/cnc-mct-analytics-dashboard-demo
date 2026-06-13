package com.demo.cnc.dto;

public record StatusDistributionDto(
        String status,
        long durationSeconds,
        double ratio
) {
}
