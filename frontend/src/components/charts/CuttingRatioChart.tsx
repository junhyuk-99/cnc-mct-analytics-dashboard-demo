import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { CuttingRatio } from "../../types/dashboard";
import { formatPercent, formatSeconds } from "../../utils/format";

type CuttingRatioChartProps = {
  data: CuttingRatio[];
};

export function CuttingRatioChart({ data }: CuttingRatioChartProps) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>CUTTING_RATIO</h2>
        <span>RUNTIME / CUTTIME</span>
      </div>
      <div className="chart-frame">
        {data.length === 0 ? (
          <p className="empty-state">No cutting ratio data for the selected range.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 18, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(152,203,255,0.14)" />
              <XAxis dataKey="machineId" tick={{ fontSize: 12, fill: "#bec7d4" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(value) => `${value}%`} tick={{ fill: "#bec7d4" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#111316", border: "1px solid #3f4852", color: "#e2e2e6" }}
                cursor={{ fill: "rgba(255,183,127,0.08)" }}
                formatter={(value, name, item) => {
                  const payload = item.payload as CuttingRatio;
                  return [
                    `${formatPercent(Number(value))} / runtime ${formatSeconds(
                      payload.runtimeSeconds
                    )} / cuttime ${formatSeconds(payload.cuttimeSeconds)}`,
                    "Cutting Ratio"
                  ];
                }}
              />
              <Bar dataKey="cuttingRatio" fill="#ffb77f" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
