import { useCallback, useEffect, useMemo, useState } from "react";
import { CuttingRatioChart } from "../components/charts/CuttingRatioChart";
import { DailyTrendChart } from "../components/charts/DailyTrendChart";
import { StatusDistributionChart } from "../components/charts/StatusDistributionChart";
import { UtilizationBarChart } from "../components/charts/UtilizationBarChart";
import { DateRangeFilter } from "../components/filters/DateRangeFilter";
import { MachineFilter } from "../components/filters/MachineFilter";
import { KpiCard } from "../components/kpi/KpiCard";
import { AlarmHistoryTable } from "../components/tables/AlarmHistoryTable";
import {
  fetchAlarms,
  fetchCuttingRatio,
  fetchDailyTrend,
  fetchMachines,
  fetchStatusDistribution,
  fetchSummary,
  fetchUtilization
} from "../services/dashboardApi";
import type {
  AlarmHistory,
  CuttingRatio,
  DailyTrend,
  DashboardFilters,
  DashboardSummary,
  Machine,
  StatusDistribution,
  Utilization
} from "../types/dashboard";
import { formatNumber, formatPercent } from "../utils/format";

const INITIAL_FILTERS: DashboardFilters = {
  from: "2026-01-01",
  to: "2026-01-30",
  machineId: "",
  severity: ""
};

export function DashboardPage() {
  const [filters, setFilters] = useState<DashboardFilters>(INITIAL_FILTERS);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [utilization, setUtilization] = useState<Utilization[]>([]);
  const [cuttingRatio, setCuttingRatio] = useState<CuttingRatio[]>([]);
  const [statusDistribution, setStatusDistribution] = useState<StatusDistribution[]>([]);
  const [dailyTrend, setDailyTrend] = useState<DailyTrend[]>([]);
  const [alarms, setAlarms] = useState<AlarmHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFilter = (key: keyof DashboardFilters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const dateRange = { from: filters.from, to: filters.to };
      const [
        machinesData,
        summaryData,
        utilizationData,
        cuttingRatioData,
        statusData,
        trendData,
        alarmsData
      ] = await Promise.all([
        fetchMachines(),
        fetchSummary(dateRange),
        fetchUtilization(dateRange),
        fetchCuttingRatio(dateRange),
        fetchStatusDistribution(dateRange),
        fetchDailyTrend(dateRange),
        fetchAlarms(filters)
      ]);
      setMachines(machinesData);
      setSummary(summaryData);
      setUtilization(utilizationData);
      setCuttingRatio(cuttingRatioData);
      setStatusDistribution(statusData);
      setDailyTrend(trendData);
      setAlarms(alarmsData);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const filteredUtilization = useMemo(
    () =>
      filters.machineId
        ? utilization.filter((item) => item.machineId === filters.machineId)
        : utilization,
    [filters.machineId, utilization]
  );

  const filteredCuttingRatio = useMemo(
    () =>
      filters.machineId
        ? cuttingRatio.filter((item) => item.machineId === filters.machineId)
        : cuttingRatio,
    [cuttingRatio, filters.machineId]
  );

  return (
    <div className="dashboard-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Local API Dashboard</p>
          <h2>Manufacturing analytics overview</h2>
        </div>
        <button type="button" onClick={() => void loadDashboard()} disabled={isLoading}>
          {isLoading ? "Loading..." : "Refresh"}
        </button>
      </header>

      <section className="filters-bar" aria-label="dashboard filters">
        <DateRangeFilter
          from={filters.from}
          to={filters.to}
          onFromChange={(value) => updateFilter("from", value)}
          onToChange={(value) => updateFilter("to", value)}
        />
        <MachineFilter
          machines={machines}
          value={filters.machineId}
          onChange={(value) => updateFilter("machineId", value)}
        />
        <label>
          <span>Severity</span>
          <select
            value={filters.severity}
            onChange={(event) => updateFilter("severity", event.target.value)}
          >
            <option value="">All severities</option>
            <option value="INFO">INFO</option>
            <option value="WARNING">WARNING</option>
            <option value="CRITICAL">CRITICAL</option>
          </select>
        </label>
      </section>

      {error ? (
        <div className="error-banner" role="alert">
          API error: {error}
        </div>
      ) : null}

      <section className="kpi-grid" aria-label="dashboard KPI cards">
        <KpiCard label="Machine Count" value={formatNumber(summary?.machineCount)} />
        <KpiCard label="Average Utilization" value={formatPercent(summary?.averageUtilization)} />
        <KpiCard
          label="Average Cutting Ratio"
          value={formatPercent(summary?.averageCuttingRatio)}
        />
        <KpiCard label="Alarm Count" value={formatNumber(summary?.alarmCount)} />
        <KpiCard
          label="Critical Alarms"
          value={formatNumber(summary?.criticalAlarmCount)}
          tone="critical"
        />
      </section>

      {isLoading ? <div className="loading-strip">Loading dashboard data...</div> : null}

      <section className="dashboard-grid">
        <UtilizationBarChart data={filteredUtilization} />
        <CuttingRatioChart data={filteredCuttingRatio} />
        <StatusDistributionChart data={statusDistribution} />
        <DailyTrendChart data={dailyTrend} />
        <AlarmHistoryTable data={alarms} />
      </section>
    </div>
  );
}
