import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { StatusDistribution } from "../../types/dashboard";
import { formatPercent, formatSeconds } from "../../utils/format";

const STATUS_COLORS: Record<string, string> = {
  RUNNING: "#2f6f73",
  IDLE: "#c49a36",
  ALARM: "#b84a4a",
  OFFLINE: "#667085"
};

type StatusDistributionChartProps = {
  data: StatusDistribution[];
};

export function StatusDistributionChart({ data }: StatusDistributionChartProps) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Status Distribution</h2>
      </div>
      <div className="status-layout">
        <div className="pie-frame">
          {data.length === 0 ? (
            <p className="empty-state">No status data for the selected range.</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="ratio"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={86}
                  innerRadius={48}
                  paddingAngle={2}
                >
                  {data.map((entry) => (
                    <Cell key={entry.status} fill={STATUS_COLORS[entry.status] ?? "#476582"} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, item) => {
                    const payload = item.payload as StatusDistribution;
                    return [
                      `${formatPercent(Number(value))} / ${formatSeconds(payload.durationSeconds)}`,
                      String(name)
                    ];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="legend-list">
          {data.map((item) => (
            <div key={item.status} className="legend-row">
              <span
                className="legend-dot"
                style={{ backgroundColor: STATUS_COLORS[item.status] ?? "#476582" }}
              />
              <span>{item.status}</span>
              <strong>{formatPercent(item.ratio)}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
