package com.demo.cnc.dto;

import java.time.Instant;
import java.time.LocalDate;

public record AlarmHistoryDto(
        String alarmId,
        String machineId,
        String severity,
        String alarmCode,
        String message,
        Instant occurredAt,
        Instant clearedAt,
        LocalDate workDate
) {
}
