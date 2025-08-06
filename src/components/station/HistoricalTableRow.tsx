import React from "react";
import { formatDateToVN } from "@/lib/utils/date.utils";
import { getWarningColorClasses } from "@/lib/utils/station.utils";
import type { StationDataAverage } from "@/types/station.types";

interface HistoricalTableRowProps {
  dayData: StationDataAverage;
  measuringKeys: string[];
}

// Sử dụng React.memo để ngăn việc render lại không cần thiết
// nếu props của nó không thay đổi.
export const HistoricalTableRow = React.memo(function HistoricalTableRow({
  dayData,
  measuringKeys,
}: HistoricalTableRowProps) {
  return (
    <tr key={dayData.receivedAt}>
      {/* Ô hiển thị ngày */}
      <td className="border px-4 py-2 font-semibold">
        {formatDateToVN(dayData.receivedAt)}
      </td>

      {/* Các ô dữ liệu */}
      {measuringKeys.map((key) => {
        const log = dayData.measuringLogs?.[key];
        const value = log?.value?.toFixed(2) ?? "-";
        const level = log?.warningLevel ?? "";

        return (
          <td
            key={key}
            className={`border px-4 py-2 ${getWarningColorClasses(level)}`}
          >
            {value}
          </td>
        );
      })}
    </tr>
  );
});
