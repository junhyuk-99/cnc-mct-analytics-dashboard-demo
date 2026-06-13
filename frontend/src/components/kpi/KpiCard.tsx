type KpiCardProps = {
  label: string;
  value: string;
  tone?: "default" | "critical";
};

export function KpiCard({ label, value, tone = "default" }: KpiCardProps) {
  return (
    <article className={`kpi-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
