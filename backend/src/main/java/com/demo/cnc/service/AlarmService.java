package com.demo.cnc.service;

import com.demo.cnc.dto.AlarmHistoryDto;
import com.demo.cnc.exception.BadRequestException;
import com.demo.cnc.model.AlarmEvent;
import com.demo.cnc.repository.AlarmEventRepository;
import com.demo.cnc.service.DateRangeParser.DateRange;
import java.util.List;
import java.util.Set;
import org.springframework.stereotype.Service;

@Service
public class AlarmService {

    private static final Set<String> SEVERITIES = Set.of("INFO", "WARNING", "CRITICAL");

    private final AlarmEventRepository alarmEventRepository;

    public AlarmService(AlarmEventRepository alarmEventRepository) {
        this.alarmEventRepository = alarmEventRepository;
    }

    public List<AlarmHistoryDto> getAlarms(String from, String to, String severity, String machineId) {
        DateRange range = DateRangeParser.parse(from, to);
        String normalizedSeverity = normalize(severity);
        String normalizedMachineId = normalize(machineId);
        if (normalizedSeverity != null && !SEVERITIES.contains(normalizedSeverity)) {
            throw new BadRequestException("severity must be one of INFO, WARNING, CRITICAL");
        }

        List<AlarmEvent> alarms;
        if (normalizedSeverity != null && normalizedMachineId != null) {
            alarms = alarmEventRepository.findByWorkDateBetweenAndSeverityAndMachineIdOrderByOccurredAtDesc(
                    range.from(),
                    range.to(),
                    normalizedSeverity,
                    normalizedMachineId
            );
        } else if (normalizedSeverity != null) {
            alarms = alarmEventRepository.findByWorkDateBetweenAndSeverityOrderByOccurredAtDesc(
                    range.from(),
                    range.to(),
                    normalizedSeverity
            );
        } else if (normalizedMachineId != null) {
            alarms = alarmEventRepository.findByWorkDateBetweenAndMachineIdOrderByOccurredAtDesc(
                    range.from(),
                    range.to(),
                    normalizedMachineId
            );
        } else {
            alarms = alarmEventRepository.findByWorkDateBetweenOrderByOccurredAtDesc(range.from(), range.to());
        }

        return alarms.stream()
                .map(this::toDto)
                .toList();
    }

    private String normalize(String value) {
        return value == null || value.isBlank() ? null : value.trim().toUpperCase();
    }

    private AlarmHistoryDto toDto(AlarmEvent event) {
        return new AlarmHistoryDto(
                event.getAlarmId(),
                event.getMachineId(),
                event.getSeverity(),
                event.getAlarmCode(),
                event.getMessage(),
                event.getOccurredAt(),
                event.getClearedAt(),
                event.getWorkDate()
        );
    }
}
