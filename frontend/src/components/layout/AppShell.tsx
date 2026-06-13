import type { ReactNode } from "react";
import { apiBaseUrl } from "../../services/apiClient";

type AppShellProps = {
  children: ReactNode;
};

const demoNavigation = [
  { label: "Overview", href: "#overview" },
  { label: "Utilization", href: "#utilization" },
  { label: "Cutting Ratio", href: "#cutting-ratio" },
  { label: "Status Distribution", href: "#status-distribution" },
  { label: "Daily Trend", href: "#daily-trend" },
  { label: "Alarm History", href: "#alarm-history" }
];

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-main">
          <div>
            <p className="eyebrow">Portfolio Demo</p>
            <h1>CNC/MCT Analytics Dashboard</h1>
            <p className="subtitle">Synthetic manufacturing data demo</p>
          </div>
          <nav className="demo-nav" aria-label="Dashboard sections">
            {demoNavigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="sidebar-footer">
          <div className="notice-stack" aria-label="data safety notices">
            <span>Synthetic Data</span>
            <span>Local API</span>
            <span>No Production Data</span>
          </div>
          <div className="api-note">
            <span>API</span>
            <strong>{apiBaseUrl}</strong>
          </div>
        </div>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
}
