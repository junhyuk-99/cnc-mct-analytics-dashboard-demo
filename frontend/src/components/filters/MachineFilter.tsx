import type { Machine } from "../../types/dashboard";

type MachineFilterProps = {
  machines: Machine[];
  value: string;
  onChange: (value: string) => void;
};

export function MachineFilter({ machines, value, onChange }: MachineFilterProps) {
  return (
    <label>
      <span>Machine</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">All machines</option>
        {machines.map((machine) => (
          <option key={machine.machineId} value={machine.machineId}>
            {machine.machineId} / {machine.machineName}
          </option>
        ))}
      </select>
    </label>
  );
}
