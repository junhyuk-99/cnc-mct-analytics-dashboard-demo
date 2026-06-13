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
        <h2>Cutting Ratio</h2>
      </div>
      <div className="chart-frame">
        {data.length === 0 ? (
          <p className="empty-state">No cutting ratio data for the selected range.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 18, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="machineId" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip
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
              <Bar dataKey="cuttingRatio" fill="#9b5f2a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
