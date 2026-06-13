# Frontend

This React frontend is a public portfolio demo for the synthetic CNC/MCT dashboard API. It calls the local Spring Boot backend directly and does not include login, JWT handling, user administration, file upload/download, or mock fallback behavior.

## Stack

- Vite
- React
- TypeScript
- Recharts
- Plain CSS
- npm

## Configuration

The API base URL is read from `VITE_API_BASE_URL`.

```env
VITE_API_BASE_URL=http://localhost:8090/api
```

Create local environment files only if needed for local development. Do not commit real credentials, production endpoints, customer names, server IPs, tokens, or private environment values.

## Run

Start the backend first:

```powershell
cd backend
.\gradlew.bat bootRun
```

Then run the frontend in a new PowerShell session:

```powershell
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Build

```powershell
cd frontend
npm install
npm run build
```

## API Integration

The frontend calls:

- `GET /machines`
- `GET /dashboard/summary?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `GET /dashboard/utilization?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `GET /dashboard/cutting-ratio?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `GET /dashboard/status-distribution?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `GET /dashboard/daily-trend?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `GET /alarms?from=YYYY-MM-DD&to=YYYY-MM-DD&machineId=&severity=`

The API client expects the common response wrapper:

```json
{
  "success": true,
  "data": {}
}
```

If `success` is not `true`, or if the HTTP request fails, the dashboard shows an API error banner. There is intentionally no mock data fallback.

## Initial Filters

- `from`: `2026-01-01`
- `to`: `2026-01-30`
- `machineId`: all machines
- `severity`: all severities

## Implemented UI

- App shell with demo data notices
- Date, machine, and severity filters
- Refresh action and loading state
- API error and empty states
- KPI cards
- Utilization bar chart
- Cutting ratio bar chart
- Status distribution chart
- Daily trend chart
- Alarm history table capped at 50 visible rows
