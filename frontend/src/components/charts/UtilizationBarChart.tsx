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
        <h2>Utilization</h2>
      </div>
      <div className="chart-frame">
        {data.length === 0 ? (
          <p className="empty-state">No utilization data for the selected range.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 18, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="machineId" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip
                formatter={(value) => [formatPercent(Number(value)), "Utilization"]}
                labelFormatter={(label) => {
                  const record = data.find((item) => item.machineId === label);
                  return record
                    ? `${record.machineName} (${formatSeconds(record.operatingSeconds)} operating)`
                    : label;
                }}
              />
              <Bar dataKey="utilization" fill="#2f6f73" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
