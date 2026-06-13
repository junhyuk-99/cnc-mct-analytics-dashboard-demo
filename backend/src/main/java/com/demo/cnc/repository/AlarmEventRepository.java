package com.demo.cnc.repository;

import com.demo.cnc.model.AlarmEvent;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlarmEventRepository extends MongoRepository<AlarmEvent, String> {
    List<AlarmEvent> findByWorkDateBetweenOrderByOccurredAtDesc(LocalDate from, LocalDate to);
    List<AlarmEvent> findByWorkDateBetweenAndSeverityOrderByOccurredAtDesc(LocalDate from, LocalDate to, String severity);
    List<AlarmEvent> findByWorkDateBetweenAndMachineIdOrderByOccurredAtDesc(LocalDate from, LocalDate to, String machineId);
    List<AlarmEvent> findByWorkDateBetweenAndSeverityAndMachineIdOrderByOccurredAtDesc(
            LocalDate from,
            LocalDate to,
            String severity,
            String machineId
    );
}
