package com.demo.cnc.dto;

public record UtilizationDto(
        String machineId,
        String machineName,
        String machineType,
        long operatingSeconds,
        long plannedSeconds,
        double utilization
) {
}
