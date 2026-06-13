package com.demo.cnc.model;

import java.time.Instant;
import java.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "alarm_history")
public class AlarmEvent {

    @Id
    private String id;
    private String alarmId;
    private String machineId;
    private String severity;
    private String alarmCode;
    private String message;
    private Instant occurredAt;
    private Instant clearedAt;
    private LocalDate workDate;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getAlarmId() { return alarmId; }
    public void setAlarmId(String alarmId) { this.alarmId = alarmId; }
    public String getMachineId() { return machineId; }
    public void setMachineId(String machineId) { this.machineId = machineId; }
    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
    public String getAlarmCode() { return alarmCode; }
    public void setAlarmCode(String alarmCode) { this.alarmCode = alarmCode; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public Instant getOccurredAt() { return occurredAt; }
    public void setOccurredAt(Instant occurredAt) { this.occurredAt = occurredAt; }
    public Instant getClearedAt() { return clearedAt; }
    public void setClearedAt(Instant clearedAt) { this.clearedAt = clearedAt; }
    public LocalDate getWorkDate() { return workDate; }
    public void setWorkDate(LocalDate workDate) { this.workDate = workDate; }
}
