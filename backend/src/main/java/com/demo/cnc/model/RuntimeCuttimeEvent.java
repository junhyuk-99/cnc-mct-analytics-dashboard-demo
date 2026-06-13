package com.demo.cnc.model;

import java.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "runtime_cuttime")
public class RuntimeCuttimeEvent {

    @Id
    private String id;
    private String machineId;
    private LocalDate workDate;
    private long runtimeSeconds;
    private long cuttimeSeconds;
    private double cuttingRatio;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getMachineId() { return machineId; }
    public void setMachineId(String machineId) { this.machineId = machineId; }
    public LocalDate getWorkDate() { return workDate; }
    public void setWorkDate(LocalDate workDate) { this.workDate = workDate; }
    public long getRuntimeSeconds() { return runtimeSeconds; }
    public void setRuntimeSeconds(long runtimeSeconds) { this.runtimeSeconds = runtimeSeconds; }
    public long getCuttimeSeconds() { return cuttimeSeconds; }
    public void setCuttimeSeconds(long cuttimeSeconds) { this.cuttimeSeconds = cuttimeSeconds; }
    public double getCuttingRatio() { return cuttingRatio; }
    public void setCuttingRatio(double cuttingRatio) { this.cuttingRatio = cuttingRatio; }
}
