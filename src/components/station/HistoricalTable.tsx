import type { StationDataAverage } from "@/types/station.types";
import { HistoricalTableHeader } from "./HistoricalTableHeader";
import { HistoricalTableRow } from "./HistoricalTableRow";

interface HistoricalTableProps {
  data: StationDataAverage[];
  measuringKeys: string[];
}

export function HistoricalTable({ data, measuringKeys }: HistoricalTableProps) {
  return (
    <div className="pt-6">
      <h2 className="text-2xl font-bold mb-4">Dữ liệu 30 ngày gần nhất</h2>
      <table className="table-auto w-full text-center border border-collapse border-gray-300">
        <HistoricalTableHeader measuringKeys={measuringKeys} />
        <tbody>
          {data.map((day) => (
            <HistoricalTableRow
              key={day.receivedAt}
              dayData={day}
              measuringKeys={measuringKeys}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
