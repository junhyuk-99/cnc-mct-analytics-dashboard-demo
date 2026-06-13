package com.demo.cnc.dto;

import java.time.LocalDate;

public record DailyTrendDto(
        LocalDate workDate,
        double averageUtilization,
        double averageCuttingRatio,
        long alarmCount,
        long criticalAlarmCount
) {
}
