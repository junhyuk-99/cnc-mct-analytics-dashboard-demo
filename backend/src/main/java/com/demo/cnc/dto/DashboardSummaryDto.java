package com.demo.cnc.dto;

public record DashboardSummaryDto(
        int machineCount,
        double averageUtilization,
        double averageCuttingRatio,
        long alarmCount,
        long criticalAlarmCount,
        int runningMachineCount,
        int idleMachineCount,
        int offlineMachineCount
) {
}
