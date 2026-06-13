import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { Utilization } from "../../types/dashboard";
import { formatPercent, formatSeconds } from "../../utils/format";

type UtilizationBarChartProps = {
  data: Utilization[];
};

export function UtilizationBarChart({ data }: UtilizationBarChartProps) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>UTILIZATION</h2>
        <span>Y_AXIS_PERCENT</span>
      </div>
      <div className="chart-frame">
        {data.length === 0 ? (
          <p className="empty-state">No utilization data for the selected range.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 18, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(152,203,255,0.14)" />
              <XAxis dataKey="machineId" tick={{ fontSize: 12, fill: "#bec7d4" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(value) => `${value}%`} tick={{ fill: "#bec7d4" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#111316", border: "1px solid #3f4852", color: "#e2e2e6" }}
                cursor={{ fill: "rgba(152,203,255,0.08)" }}
                formatter={(value) => [formatPercent(Number(value)), "Utilization"]}
                labelFormatter={(label) => {
                  const record = data.find((item) => item.machineId === label);
                  return record
                    ? `${record.machineName} (${formatSeconds(record.operatingSeconds)} operating)`
                    : label;
                }}
              />
              <Bar dataKey="utilization" fill="#0be298" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
