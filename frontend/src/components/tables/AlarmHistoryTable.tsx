import type { AlarmHistory } from "../../types/dashboard";
import { formatDateTime } from "../../utils/format";

type AlarmHistoryTableProps = {
  data: AlarmHistory[];
};

export function AlarmHistoryTable({ data }: AlarmHistoryTableProps) {
  const visibleRows = data.slice(0, 50);

  return (
    <section className="panel wide">
      <div className="panel-header">
        <h2>ALARM_HISTORY</h2>
        <span>{visibleRows.length} shown</span>
      </div>
      {visibleRows.length === 0 ? (
        <p className="empty-state table-empty">No alarms for the selected filters.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Occurred At</th>
                <th>Machine</th>
                <th>Severity</th>
                <th>Code</th>
                <th>Message</th>
                <th>Cleared At</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((alarm) => (
                <tr key={alarm.alarmId} className={alarm.severity === "CRITICAL" ? "critical-row" : undefined}>
                  <td>{formatDateTime(alarm.occurredAt)}</td>
                  <td>{alarm.machineId}</td>
                  <td>
                    <span className={`severity-badge ${alarm.severity.toLowerCase()}`}>
                      {alarm.severity}
                    </span>
                  </td>
                  <td>{alarm.alarmCode}</td>
                  <td>{alarm.message}</td>
                  <td>{formatDateTime(alarm.clearedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
