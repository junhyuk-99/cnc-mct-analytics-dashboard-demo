type KpiCardProps = {
  label: string;
  value: string;
  meta?: string;
  percent?: number | null;
  tone?: "primary" | "tertiary" | "secondary" | "critical" | "default";
};

export function KpiCard({ label, value, meta, percent, tone = "default" }: KpiCardProps) {
  const normalizedPercent =
    typeof percent === "number" && !Number.isNaN(percent) ? Math.max(0, Math.min(100, percent)) : null;
  const strokeDasharray = normalizedPercent === null ? "0 100" : `${normalizedPercent} 100`;

  return (
    <article className={`kpi-card ${tone}`}>
      {normalizedPercent === null ? null : (
        <svg className="kpi-gauge" viewBox="0 0 42 42" role="img" aria-label={`${label} gauge`}>
          <circle className="gauge-track" cx="21" cy="21" r="15.915" />
          <circle
            className="gauge-value"
            cx="21"
            cy="21"
            r="15.915"
            strokeDasharray={strokeDasharray}
          />
        </svg>
      )}
      <div className="kpi-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        {meta ? <em>{meta}</em> : null}
      </div>
    </article>
  );
}
