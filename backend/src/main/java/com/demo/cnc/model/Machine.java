package com.demo.cnc.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "machines")
public class Machine {

    @Id
    private String id;
    private String machineId;
    private String machineName;
    private String machineType;
    private String line;
    private boolean enabled;
    private long plannedDailySeconds;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getMachineId() { return machineId; }
    public void setMachineId(String machineId) { this.machineId = machineId; }
    public String getMachineName() { return machineName; }
    public void setMachineName(String machineName) { this.machineName = machineName; }
    public String getMachineType() { return machineType; }
    public void setMachineType(String machineType) { this.machineType = machineType; }
    public String getLine() { return line; }
    public void setLine(String line) { this.line = line; }
    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
    public long getPlannedDailySeconds() { return plannedDailySeconds; }
    public void setPlannedDailySeconds(long plannedDailySeconds) { this.plannedDailySeconds = plannedDailySeconds; }
}
