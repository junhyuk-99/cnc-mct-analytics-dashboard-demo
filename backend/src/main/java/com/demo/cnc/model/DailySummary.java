package com.demo.cnc.model;

import java.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "daily_summary")
public class DailySummary {

    @Id
    private String id;
    private LocalDate workDate;
    private int machineCount;
    private double averageUtilization;
    private double averageCuttingRatio;
    private long alarmCount;
    private long criticalAlarmCount;
    private int runningMachineCount;
    private int idleMachineCount;
    private int offlineMachineCount;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public LocalDate getWorkDate() { return workDate; }
    public void setWorkDate(LocalDate workDate) { this.workDate = workDate; }
    public int getMachineCount() { return machineCount; }
    public void setMachineCount(int machineCount) { this.machineCount = machineCount; }
    public double getAverageUtilization() { return averageUtilization; }
    public void setAverageUtilization(double averageUtilization) { this.averageUtilization = averageUtilization; }
    public double getAverageCuttingRatio() { return averageCuttingRatio; }
    public void setAverageCuttingRatio(double averageCuttingRatio) { this.averageCuttingRatio = averageCuttingRatio; }
    public long getAlarmCount() { return alarmCount; }
    public void setAlarmCount(long alarmCount) { this.alarmCount = alarmCount; }
    public long getCriticalAlarmCount() { return criticalAlarmCount; }
    public void setCriticalAlarmCount(long criticalAlarmCount) { this.criticalAlarmCount = criticalAlarmCount; }
    public int getRunningMachineCount() { return runningMachineCount; }
    public void setRunningMachineCount(int runningMachineCount) { this.runningMachineCount = runningMachineCount; }
    public int getIdleMachineCount() { return idleMachineCount; }
    public void setIdleMachineCount(int idleMachineCount) { this.idleMachineCount = idleMachineCount; }
    public int getOfflineMachineCount() { return offlineMachineCount; }
    public void setOfflineMachineCount(int offlineMachineCount) { this.offlineMachineCount = offlineMachineCount; }
}
