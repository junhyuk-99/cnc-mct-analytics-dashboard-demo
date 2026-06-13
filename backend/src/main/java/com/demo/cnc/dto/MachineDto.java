package com.demo.cnc.dto;

public record MachineDto(
        String machineId,
        String machineName,
        String machineType,
        String line,
        boolean enabled,
        long plannedDailySeconds
) {
}
