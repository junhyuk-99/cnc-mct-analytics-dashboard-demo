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
        <h2>DAILY_TREND</h2>
        <span>UTIL / CUT / ALARMS</span>
      </div>
      <div className="chart-frame large">
        {data.length === 0 ? (
          <p className="empty-state">No daily trend data for the selected range.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 12, right: 18, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(152,203,255,0.14)" />
              <XAxis dataKey="workDate" tick={{ fontSize: 12, fill: "#bec7d4" }} axisLine={false} tickLine={false} />
              <YAxis
                yAxisId="percent"
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
                tick={{ fill: "#bec7d4" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="count"
                orientation="right"
                allowDecimals={false}
                tick={{ fill: "#bec7d4" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ background: "#111316", border: "1px solid #3f4852", color: "#e2e2e6" }}
                formatter={(value, name) => {
                  if (name === "Alarm Count") {
                    return [formatNumber(Number(value)), name];
                  }
                  return [formatPercent(Number(value)), name];
                }}
              />
              <Legend wrapperStyle={{ color: "#bec7d4", fontFamily: "Consolas, monospace" }} />
              <Bar
                yAxisId="count"
                dataKey="alarmCount"
                name="Alarm Count"
                fill="#ffb77f"
                radius={[3, 3, 0, 0]}
              />
              <Line
                yAxisId="percent"
                type="monotone"
                dataKey="averageUtilization"
                name="Average Utilization"
                stroke="#0be298"
                strokeWidth={2}
                dot={false}
              />
              <Line
                yAxisId="percent"
                type="monotone"
                dataKey="averageCuttingRatio"
                name="Average Cutting Ratio"
                stroke="#98cbff"
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
