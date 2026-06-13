package com.demo.cnc.service;

import com.demo.cnc.dto.CuttingRatioDto;
import com.demo.cnc.dto.DailyTrendDto;
import com.demo.cnc.dto.DashboardSummaryDto;
import com.demo.cnc.dto.StatusDistributionDto;
import com.demo.cnc.dto.UtilizationDto;
import com.demo.cnc.model.DailySummary;
import com.demo.cnc.model.Machine;
import com.demo.cnc.repository.DailySummaryRepository;
import com.demo.cnc.repository.MachineRepository;
import com.demo.cnc.repository.MachineStatusEventRepository;
import com.demo.cnc.repository.RuntimeCuttimeEventRepository;
import com.demo.cnc.service.DateRangeParser.DateRange;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private static final List<String> STATUSES = List.of("RUNNING", "IDLE", "ALARM", "OFFLINE");

    private final DailySummaryRepository dailySummaryRepository;
    private final MachineRepository machineRepository;
    private final MachineStatusEventRepository statusEventRepository;
    private final RuntimeCuttimeEventRepository runtimeCuttimeEventRepository;

    public DashboardService(
            DailySummaryRepository dailySummaryRepository,
            MachineRepository machineRepository,
            MachineStatusEventRepository statusEventRepository,
            RuntimeCuttimeEventRepository runtimeCuttimeEventRepository
    ) {
        this.dailySummaryRepository = dailySummaryRepository;
        this.machineRepository = machineRepository;
        this.statusEventRepository = statusEventRepository;
        this.runtimeCuttimeEventRepository = runtimeCuttimeEventRepository;
    }

    public DashboardSummaryDto getSummary(String from, String to) {
        DateRange range = DateRangeParser.parse(from, to);
        List<DailySummary> summaries = dailySummaryRepository.findByWorkDateBetweenOrderByWorkDateAsc(range.from(), range.to());
        if (summaries.isEmpty()) {
            return new DashboardSummaryDto(0, 0, 0, 0, 0, 0, 0, 0);
        }

        DailySummary latest = summaries.get(summaries.size() - 1);
        return new DashboardSummaryDto(
                summaries.stream().mapToInt(DailySummary::getMachineCount).max().orElse(0),
                round(summaries.stream().mapToDouble(DailySummary::getAverageUtilization).average().orElse(0)),
                round(summaries.stream().mapToDouble(DailySummary::getAverageCuttingRatio).average().orElse(0)),
                summaries.stream().mapToLong(DailySummary::getAlarmCount).sum(),
                summaries.stream().mapToLong(DailySummary::getCriticalAlarmCount).sum(),
                latest.getRunningMachineCount(),
                latest.getIdleMachineCount(),
                latest.getOfflineMachineCount()
        );
    }

    public List<UtilizationDto> getUtilization(String from, String to) {
        DateRange range = DateRangeParser.parse(from, to);
        long days = ChronoUnit.DAYS.between(range.from(), range.to()) + 1;
        Map<String, Machine> machineById = machineRepository.findByEnabledTrueOrderByMachineTypeAscMachineIdAsc().stream()
                .collect(Collectors.toMap(Machine::getMachineId, Function.identity()));
        Map<String, Long> operatingByMachine = statusEventRepository.findByWorkDateBetween(range.from(), range.to()).stream()
                .filter(event -> event.getStatus().equals("RUNNING") || event.getStatus().equals("ALARM"))
                .collect(Collectors.groupingBy(event -> event.getMachineId(), Collectors.summingLong(event -> event.getDurationSeconds())));

        return machineById.values().stream()
                .sorted(Comparator.comparing(Machine::getMachineType).thenComparing(Machine::getMachineId))
                .map(machine -> {
                    long operatingSeconds = operatingByMachine.getOrDefault(machine.getMachineId(), 0L);
                    long plannedSeconds = machine.getPlannedDailySeconds() * days;
                    double utilization = plannedSeconds == 0 ? 0 : (operatingSeconds * 100.0) / plannedSeconds;
                    return new UtilizationDto(
                            machine.getMachineId(),
                            machine.getMachineName(),
                            machine.getMachineType(),
                            operatingSeconds,
                            plannedSeconds,
                            round(utilization)
                    );
                })
                .toList();
    }

    public List<CuttingRatioDto> getCuttingRatio(String from, String to) {
        DateRange range = DateRangeParser.parse(from, to);
        return runtimeCuttimeEventRepository.findByWorkDateBetween(range.from(), range.to()).stream()
                .collect(Collectors.groupingBy(event -> event.getMachineId()))
                .entrySet()
                .stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> {
                    long runtimeSeconds = entry.getValue().stream().mapToLong(event -> event.getRuntimeSeconds()).sum();
                    long cuttimeSeconds = entry.getValue().stream().mapToLong(event -> event.getCuttimeSeconds()).sum();
                    double cuttingRatio = runtimeSeconds == 0 ? 0 : (cuttimeSeconds * 100.0) / runtimeSeconds;
                    return new CuttingRatioDto(entry.getKey(), runtimeSeconds, cuttimeSeconds, round(cuttingRatio));
                })
                .toList();
    }

    public List<StatusDistributionDto> getStatusDistribution(String from, String to) {
        DateRange range = DateRangeParser.parse(from, to);
        Map<String, Long> durationByStatus = statusEventRepository.findByWorkDateBetween(range.from(), range.to()).stream()
                .collect(Collectors.groupingBy(event -> event.getStatus(), Collectors.summingLong(event -> event.getDurationSeconds())));
        long totalDuration = durationByStatus.values().stream().mapToLong(Long::longValue).sum();

        return STATUSES.stream()
                .map(status -> {
                    long durationSeconds = durationByStatus.getOrDefault(status, 0L);
                    double ratio = totalDuration == 0 ? 0 : (durationSeconds * 100.0) / totalDuration;
                    return new StatusDistributionDto(status, durationSeconds, round(ratio));
                })
                .toList();
    }

    public List<DailyTrendDto> getDailyTrend(String from, String to) {
        DateRange range = DateRangeParser.parse(from, to);
        return dailySummaryRepository.findByWorkDateBetweenOrderByWorkDateAsc(range.from(), range.to()).stream()
                .map(summary -> new DailyTrendDto(
                        summary.getWorkDate(),
                        summary.getAverageUtilization(),
                        summary.getAverageCuttingRatio(),
                        summary.getAlarmCount(),
                        summary.getCriticalAlarmCount()
                ))
                .toList();
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}
