package com.demo.cnc.dto;

public record CuttingRatioDto(
        String machineId,
        long runtimeSeconds,
        long cuttimeSeconds,
        double cuttingRatio
) {
}
