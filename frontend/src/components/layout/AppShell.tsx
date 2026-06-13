import type { ReactNode } from "react";
import { apiBaseUrl } from "../../services/apiClient";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Portfolio Demo</p>
          <h1>CNC/MCT Analytics Dashboard</h1>
          <p className="subtitle">Synthetic manufacturing data demo</p>
        </div>
        <div className="notice-stack" aria-label="data safety notices">
          <span>Synthetic Data</span>
          <span>Local Demo</span>
          <span>No Production Data</span>
        </div>
        <div className="api-note">
          <span>API</span>
          <strong>{apiBaseUrl}</strong>
        </div>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
}
