interface HistoricalTableHeaderProps {
  measuringKeys: string[];
}

export function HistoricalTableHeader({
  measuringKeys,
}: HistoricalTableHeaderProps) {
  return (
    <thead className="bg-gray-100 font-semibold">
      <tr>
        <th className="border px-4 py-2">Ngày</th>
        {measuringKeys.map((key) => (
          <th key={key} className="border px-4 py-2">
            {key}
          </th>
        ))}
      </tr>
    </thead>
  );
}
