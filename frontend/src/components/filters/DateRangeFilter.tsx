type DateRangeFilterProps = {
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
};

export function DateRangeFilter({ from, to, onFromChange, onToChange }: DateRangeFilterProps) {
  return (
    <div className="filter-pair">
      <label>
        <span>FROM</span>
        <input type="date" value={from} onChange={(event) => onFromChange(event.target.value)} />
      </label>
      <label>
        <span>TO</span>
        <input type="date" value={to} onChange={(event) => onToChange(event.target.value)} />
      </label>
    </div>
  );
}
