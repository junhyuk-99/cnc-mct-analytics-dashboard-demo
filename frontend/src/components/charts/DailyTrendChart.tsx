import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { DailyTrend } from "../../types/dashboard";
import { formatNumber, formatPercent } from "../../utils/format";

type DailyTrendChartProps = {
  data: DailyTrend[];
};

export function DailyTrendChart({ data }: DailyTrendChartProps) {
  return (
    <section className="panel wide">
      <div className="panel-header">
        <h2>Daily Trend</h2>
      </div>
      <div className="chart-frame large">
        {data.length === 0 ? (
          <p className="empty-state">No daily trend data for the selected range.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 12, right: 18, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="workDate" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="percent" tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
              <YAxis yAxisId="count" orientation="right" allowDecimals={false} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "Alarm Count") {
                    return [formatNumber(Number(value)), name];
                  }
                  return [formatPercent(Number(value)), name];
                }}
              />
              <Legend />
              <Bar
                yAxisId="count"
                dataKey="alarmCount"
                name="Alarm Count"
                fill="#c49a36"
                radius={[3, 3, 0, 0]}
              />
              <Line
                yAxisId="percent"
                type="monotone"
                dataKey="averageUtilization"
                name="Average Utilization"
                stroke="#2f6f73"
                strokeWidth={2}
                dot={false}
              />
              <Line
                yAxisId="percent"
                type="monotone"
                dataKey="averageCuttingRatio"
                name="Average Cutting Ratio"
                stroke="#9b5f2a"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
