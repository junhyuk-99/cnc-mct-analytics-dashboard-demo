# Reuse Candidates Report

## 1. Summary

- Analysis targets:
  - `original-server/src/main/java/**`
  - `original-client/src/**`
  - `demo/` as the public portfolio repository
- Original source direct copy: **prohibited**
- Git history import from original repositories: **prohibited**
- Report-only output: `demo/docs/REUSE_CANDIDATES.md`

Recommended strategy:

- **copy 금지**: do not bulk-copy original folders or private repo history.
- **reference only**: inspect structure, endpoint shape, chart behavior, and aggregation intent.
- **selected rewrite**: rebuild demo code under new packages/components with synthetic data contracts.
- **synthetic data replacement**: replace all production-shaped data with fake demo datasets.

## 2. Recommended MVP Scope

Limit the first public demo MVP to these screens and API capabilities:

- KPI summary
- Equipment utilization
- RunTime / CutTime cutting ratio
- Alarm history
- Machine status distribution
- Daily trend chart

Out of scope for MVP:

- Login/authentication
- User management
- Program/permission management
- Production print templates
- Real file upload/download workflows
- Operational schedulers or password recovery tooling

## 3. Backend Reuse Candidates

| Candidate ID | Original path | Detected purpose | Related demo feature | Reuse type | Risk | Required sanitization | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| B-01 Controller | `original-server/src/main/java/.../controller/home/HomeController.java` | Dashboard summary endpoints for utilization, alarms, recent alarms, and overall summary | KPI summary, daily trend chart | reference-only | Medium | Rewrite endpoint names and response contract; remove auth/session assumptions; use synthetic data only | Good conceptual reference for a compact MVP dashboard API. |
| B-02 Service | `original-server/src/main/java/.../service/impl/HomeServiceImpl.java` | Combines utilization, alarms, tool usage, and cutting metrics into summary cards | KPI summary, RunTime / CutTime cutting ratio, alarm summary | reference-only | High | Do not copy aggregation code directly; remove real collection fields, debug logs, and operational naming | Useful for understanding aggregation flow, but should be redesigned around demo schema. |
| B-03 DTO | `original-server/src/main/java/.../dto/Home*Dto.java` | Summary, alarm, utilization, and cutting response records | KPI cards, daily trend chart | selective-sanitized-copy | Medium | Rename fields to demo-neutral names; remove real equipment/code assumptions | DTO shape can inspire public API contract after renaming. |
| B-04 Controller | `original-server/src/main/java/.../controller/dsh/DshEquipMasterController.java` | Equipment master list endpoint | Equipment filter, equipment utilization | reference-only | Medium | Replace source with `machines.json` / demo Mongo collection | Keep only the idea of a lightweight machine list API. |
| B-05 Service | `original-server/src/main/java/.../service/DshEquipMasterService.java`, `.../service/impl/DshEquipMasterServiceImpl.java` | Equipment list service wrapper | Equipment filter | reference-only | Medium | Remove production master-data dependency; use synthetic machine model | Rebuild as `MachineService` in demo. |
| B-06 Controller | `original-server/src/main/java/.../controller/dsh/DshEquipUtilController.java` | Equipment utilization endpoints | Equipment utilization | reference-only | Medium | Replace status taxonomy and time windows with demo constants | Good endpoint split: equipment list plus utilization. |
| B-07 Service / Repository | `original-server/src/main/java/.../service/impl/DshEquipUtilServiceImpl.java`, `.../repository/mongo/DshEquipUtilRepository.java` | Calculates run/down/utilization over a date range | Equipment utilization, machine status distribution | reference-only | High | Rewrite aggregation over synthetic `status-history`; remove real field names and calendar dependencies | High-value logic reference, not copy-safe. |
| B-08 Controller | `original-server/src/main/java/.../controller/dsh/DshMachineStatusController.java` | Current status, summary, and history endpoints | Machine status distribution, daily trend chart | reference-only | Medium | Replace status codes and machine identifiers with fake demo values | Useful for demo status API boundaries. |
| B-09 Service / Repository | `original-server/src/main/java/.../service/impl/DshMachineStatusServiceImpl.java`, `.../repository/mongo/DshMachineStatusRepository.java` | Reads machine status snapshots/history | Machine status distribution | reference-only | High | Rebuild over synthetic `status-history.json`; remove operational field names | Keep concepts: current snapshot, status count summary, time series history. |
| B-10 Controller | `original-server/src/main/java/.../controller/dsh/DshCutMonController.java` | CutTime / RunTime equipment list, day/month/year endpoints | RunTime / CutTime cutting ratio, daily trend chart | reference-only | Medium | Rename API to demo-neutral `/api/dashboard/cutting`; use fake machine IDs | Strong candidate for MVP cutting-ratio API design. |
| B-11 Service / Repository | `original-server/src/main/java/.../service/impl/DshCutMonServiceImpl.java`, `.../repository/mongo/DshCutMonRepository.java` | Aggregates RunTime and CutTime metrics | RunTime / CutTime cutting ratio | reference-only | High | Rewrite calculations over synthetic `runtime-cuttime`; remove real signal names and collection assumptions | Treat formulas as conceptual reference only. |
| B-12 DTO | `original-server/src/main/java/.../dto/DshCut*Dto.java` | Day/month/year cutting response records | Cutting ratio chart, daily trend chart | selective-sanitized-copy | Medium | Rename fields to `machineId`, `runtimeSeconds`, `cuttimeSeconds`, `cuttingRatio` | Good DTO inspiration if simplified. |
| B-13 Controller / Service / Repository | `original-server/src/main/java/.../controller/dsh/DshPreAlarmController.java`, `.../service/impl/DshPreAlarmServiceImpl.java`, `.../repository/mongo/DshPreAlarmRepository.java` | Alarm equipment list, code list, history, summary | Alarm history | reference-only | High | Replace alarm codes/descriptions with fake codes; remove real severity mapping if site-specific | Keep only history/summary pagination and filtering ideas. |
| B-14 DTO | `original-server/src/main/java/.../dto/DshPreAlarm*Dto.java` | Alarm code, equipment, history, and summary records | Alarm history, KPI summary | selective-sanitized-copy | Medium | Use fake alarm code fields and no real descriptions | Candidate for simplified alarm response contract. |
| B-15 Controller / Service | `original-server/src/main/java/.../controller/dsh/DshPerfPeriodController.java`, `DshPerfMonthController.java`, `DshPerfYearController.java`, related services | Period/month/year performance chart and grid endpoints | Daily trend chart, KPI summary | reference-only | Medium | Reduce to one daily summary endpoint for MVP; remove grid-heavy behavior | Useful but likely too broad for MVP. |
| B-16 Repository | `original-server/src/main/java/.../repository/mongo/DshPerf*Repository.java` | Mongo aggregations for performance charts | Daily trend chart | reference-only | High | Rewrite queries for demo schema; avoid carrying real collection names | Use only to understand aggregation layering. |
| B-17 Utility | `original-server/src/main/java/.../common/utils/LocalDateFormatterUtil.java`, `LocalDateTimeFormatterUtil.java`, `ZonedDateTimeFormatterUtil.java` | Date/time formatting helpers | Date/period filters | selective-sanitized-copy | Low | Move to new package; keep only generic date utilities | Safe if stripped to generic Java date helpers. |
| B-18 Utility | `original-server/src/main/java/.../common/utils/ProductResultProductNameParser.java` | Parses production-like name tokens into order/process/equipment concepts | Cutting ratio, synthetic production labels | reference-only | Medium | Do not preserve production token grammar; create demo parser if needed | Useful only if demo includes fake production labels. |
| B-19 Config / Indexing | `original-server/src/main/java/.../config/mongo/*IndexInitializer.java` | Mongo index setup for dashboard collections | Backend performance | reference-only | Medium | Rewrite index names and fields for demo collections | Consider after MVP APIs work. |
| B-20 Scheduler / Rollup | `original-server/src/main/java/.../service/impl/DshCutRollup*.java` | Precompute/backfill cutting rollups | Future optimization | reference-only | High | Do not copy scheduler/backfill behavior; avoid operational cron assumptions | Not needed for MVP; maybe later as synthetic rollup script. |

## 4. Frontend Reuse Candidates

| Candidate ID | Original path | Detected purpose | Related demo feature | Reuse type | Risk | Required sanitization | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F-01 Page | `original-client/src/pages/DshUtil/DshUtilPage.jsx` | Utilization dashboard with filters and charts | Equipment utilization, daily trend chart | reference-only | Medium | Rebuild UI with demo labels and simplified data contract | Strong reference for utilization chart layout. |
| F-02 Page | `original-client/src/pages/DshEquipUtil/DshEquipUtilPage.jsx` | Equipment utilization page | Equipment utilization | reference-only | Medium | Replace operational labels and real status vocabulary | May overlap with F-01; choose one pattern for MVP. |
| F-03 Page | `original-client/src/pages/DshCutDay/DshCutDayPage.jsx`, `DshCutMonPage.jsx`, `DshCutYearPage.jsx` | Cutting metric pages by day/month/year | RunTime / CutTime cutting ratio | reference-only | Medium | Collapse into one MVP cutting-ratio view; replace machine IDs | Good visual reference for RunTime/CutTime comparison. |
| F-04 Page | `original-client/src/pages/DshPreAlarm/DshPreAlarmPage.jsx` | Alarm history and summary page | Alarm history | reference-only | Medium | Replace alarm code text and equipment values; avoid real history data | Use only interaction pattern and table/chart split. |
| F-05 Page | `original-client/src/pages/DshMachineStatus/DshMachineStatusPage.jsx` | Machine current status, summary, and history page | Machine status distribution | reference-only | Medium | Replace status labels with demo states | Candidate for status distribution widget. |
| F-06 Page | `original-client/src/pages/DshPerfPeriod/DshPerfPeriodPage.jsx`, `DshPerfMonthPage.jsx`, `DshPerfYearPage.jsx` | Performance trend pages | Daily trend chart | reference-only | Medium | Reduce to a single daily trend screen for MVP | Good reference for date-range chart interactions. |
| F-07 Service | `original-client/src/services/HomeService.js` | Calls home summary APIs | KPI summary | rewrite-from-scratch | Medium | Replace `window.SERVER_URL_IP` with demo env client; no auth token dependency | Implement a clean `dashboardApi.ts/js`. |
| F-08 Service | `original-client/src/services/DshUtilService.js`, `DshEquipUtilService.js`, `DshMachineStatusService.js`, `DshPreAlarmService.js`, `DshCut*Service.js` | Dashboard API service functions | All MVP dashboard features | rewrite-from-scratch | Medium | Rename endpoints; remove operational route names; use typed demo API | Keep the service-per-feature idea, not the source. |
| F-09 Service | `original-client/src/services/EquipMasterService.js` | Equipment list API wrapper | Equipment filters | rewrite-from-scratch | Low | Use `machines` endpoint and fake labels | Simple enough to rebuild directly. |
| F-10 API utility | `original-client/src/common/util/apiRoot.js`, `UseApi.js`, `UseApi.fetch.js`, `UseApi.axios.js` | API root resolution and HTTP wrapper | Frontend API calls | rewrite-from-scratch | High | Do not carry auth refresh flow or endpoint logging; use `VITE_API_BASE_URL` only | Demo should use a tiny fetch client. |
| F-11 Chart | `original-client/src/common/components/chart/EStatusMonitorLineChart.jsx` | Recharts line chart for status monitoring | Machine status trend | selective-sanitized-copy | Low | Rename props/series and remove domain-specific status names | One of the safest UI references. |
| F-12 Hook | `original-client/src/common/hooks/useMstMcOptions.js` | Loads equipment options with React Query | Equipment filter UI | rewrite-from-scratch | Medium | Rename from master-data naming; use fake machine options | Rebuild as `useMachineOptions`. |
| F-13 Hook | `original-client/src/common/hooks/usePrevNextDateShift.js` | Date navigation helper | Date/period filters | selective-sanitized-copy | Low | Keep generic date math only; remove page-specific defaults | Useful small utility. |
| F-14 Layout | `original-client/src/layout/component/Main.jsx`, `Sidebar.jsx`, `TabBar.jsx`, `TabRouter.jsx`, `MainLayout.jsx` | App shell, sidebar, tabs, page outlet | Dashboard layout | reference-only | Medium | Replace branding, route map, auth guards, and menu data | Use as inspiration; build simpler demo shell. |
| F-15 State management | `original-client/src/hooks/useTabs.js`, `src/recoil/tabsState.js`, `src/recoil/themeState.js` | Tabs/theme state | Dashboard layout | reference-only | Low | Remove app-specific storage keys and program routing | MVP may not need MDI tabs. |
| F-16 Utility | `original-client/src/common/util/DateStringFormatting.js`, `arrayChunk.js`, table resize/merge utilities | Generic formatting and table helpers | Filters, tables | selective-sanitized-copy | Low | Keep only generic helpers needed by MVP | Avoid table-heavy admin utilities for first version. |

## 5. Do Not Reuse

| ID | Path / pattern | Reason |
| --- | --- | --- |
| X-01 | `original-server/src/main/resources/application.yaml` | Contains environment and secret-bearing configuration patterns. |
| X-02 | `original-server/bin/**`, `original-server/build/**` | Generated output may duplicate private configuration or compiled artifacts. |
| X-03 | `original-server/logs/**`, `original-server/bootrun*`, `*.log`, `*.err`, `*.out` | Runtime logs can expose operational paths, server metadata, and DB connection details. |
| X-04 | `original-server/scripts/reset-legacy-passwords.mongosh.js` | Password reset workflow is not public-demo material. |
| X-05 | `original-server/scripts/generate-bcrypt-hashes.ps1` | Credential tooling is excluded. |
| X-06 | `original-server/src/main/resources/templates/print/**` | Print templates may contain customer-facing forms, logo references, contacts, or document structure. |
| X-07 | `original-server/src/main/resources/static/**` | Static images can include real branding or customer assets. |
| X-08 | `original-server/docs/*.json`, `original-server/docs/*sample*.json`, `original-server/docs/*diagnostics*.json` | Sample JSON may contain real-shaped equipment, alarm, or production data. |
| X-09 | `original-server/src/main/java/.../config/jwt/**`, security/auth handlers, token DTOs | Authentication and token infrastructure is out of MVP and high-risk. |
| X-10 | `original-server/src/main/java/.../controller/mongo/**`, `.../controller/mst/MstUserController.java` | Auth/user/admin endpoints are excluded. |
| X-11 | `original-server/src/main/java/.../service/impl/AdminPasswordRecoveryRunner.java`, `.../service/support/EmployeePasswordProcessor.java` | Password recovery and employee credential processing must not enter the public demo. |
| X-12 | `original-server/src/main/java/.../entity/**`, `.../key/**` | Legacy domain model may reveal production schema breadth; use a new demo model instead. |
| X-13 | `original-client/.env*` | Frontend environment files can contain endpoint values and private deployment assumptions. |
| X-14 | `original-client/ssl/**`, `*.key`, `*.cert`, `*.pem`, `*.p12`, `*.jks`, `*.keystore` | Key and certificate material is never reusable. |
| X-15 | `original-client/public/images/**`, `original-client/public/path/**` | Images may include real logos, screenshots, or brand assets. |
| X-16 | `original-client/build/**`, `original-client/node_modules/**`, package archives | Generated/dependency output is not source and can contain noise or stale values. |
| X-17 | `original-client/src/layout/LoginLayout.jsx`, `src/common/service/AuthService.js`, `src/common/util/authToken.js` | Authentication UI/token handling is excluded from MVP. |
| X-18 | `original-client/src/pages/Mst*`, `src/services/Mst*`, program/permission utilities | Management screens and operational admin flows are excluded. |
| X-19 | `original-client/src/common/util/pages/printUtil.js`, file upload/download/export utilities | Print/export/file flows are not part of the first dashboard demo. |
| X-20 | `.git/**` from any original repo | Private history must never be imported into the public demo. |

## 6. Proposed Demo Backend Structure

```text
backend/
  src/main/java/com/demo/cnc/
    CncDashboardDemoApplication.java
    controller/
      DashboardController.java
      MachineController.java
      AlarmController.java
    service/
      DashboardSummaryService.java
      UtilizationService.java
      CuttingRatioService.java
      AlarmService.java
      MachineStatusService.java
    repository/
      MachineRepository.java
      MachineStatusRepository.java
      RuntimeCuttimeRepository.java
      AlarmHistoryRepository.java
    dto/
      DashboardSummaryDto.java
      MachineDto.java
      UtilizationDto.java
      CuttingRatioDto.java
      AlarmHistoryDto.java
      StatusDistributionDto.java
      DailyTrendDto.java
    model/
      Machine.java
      MachineStatusEvent.java
      RuntimeCuttimeEvent.java
      AlarmEvent.java
    config/
      MongoConfig.java
  src/main/resources/
    application.yml
```

## 7. Proposed Demo Frontend Structure

```text
frontend/
  src/
    pages/
      DashboardPage.jsx
    components/
      kpi/
        KpiCard.jsx
      charts/
        UtilizationBarChart.jsx
        CuttingRatioChart.jsx
        StatusDistributionChart.jsx
        DailyTrendChart.jsx
      filters/
        MachineFilter.jsx
        DateRangeFilter.jsx
      tables/
        AlarmHistoryTable.jsx
      layout/
        AppShell.jsx
    services/
      apiClient.js
      dashboardApi.js
    types/
      dashboard.js
    utils/
      date.js
      number.js
```

## 8. Synthetic Data Model Proposal

All examples below are fake demo values.

### `machines.json`

```json
[
  {
    "machineId": "CNC-DEMO-01",
    "machineName": "Demo CNC 01",
    "machineType": "CNC",
    "line": "Demo Line A",
    "enabled": true
  }
]
```

### `status-history.json`

```json
[
  {
    "machineId": "CNC-DEMO-01",
    "status": "RUNNING",
    "startedAt": "2026-01-01T08:00:00Z",
    "endedAt": "2026-01-01T09:00:00Z",
    "durationSeconds": 3600
  }
]
```

### `runtime-cuttime.json`

```json
[
  {
    "machineId": "MCT-DEMO-01",
    "workDate": "2026-01-01",
    "runtimeSeconds": 21600,
    "cuttimeSeconds": 15120,
    "cuttingRatio": 70.0
  }
]
```

### `alarm-history.json`

```json
[
  {
    "alarmId": "ALARM-DEMO-0001",
    "machineId": "CNC-DEMO-01",
    "severity": "WARNING",
    "alarmCode": "DEMO-W001",
    "message": "Demo spindle load warning",
    "occurredAt": "2026-01-01T10:15:00Z",
    "clearedAt": "2026-01-01T10:25:00Z"
  }
]
```

### `daily-summary.json`

```json
[
  {
    "workDate": "2026-01-01",
    "machineCount": 6,
    "averageUtilization": 82.5,
    "averageCuttingRatio": 68.4,
    "alarmCount": 4,
    "runningMachineCount": 5,
    "idleMachineCount": 1
  }
]
```

## 9. Implementation Order

1. Confirm the synthetic data schema.
2. Create the Python seed script for `sample-data/*.json`.
3. Generate small fake datasets for machines, status history, runtime/cuttime, alarms, and daily summaries.
4. Create the Spring Boot backend skeleton under `demo/backend`.
5. Add Mongo models and repositories for demo collections.
6. Implement dashboard summary, utilization, cutting ratio, alarm history, and status distribution APIs.
7. Create the React frontend skeleton under `demo/frontend`.
8. Implement the API client and dashboard service.
9. Build the dashboard page with KPI cards, filters, charts, and alarm table.
10. Add Docker Compose for local MongoDB, backend, and frontend.
11. Run a final secret scan and verify no real values or original history were imported.
