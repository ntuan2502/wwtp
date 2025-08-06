import {
  formatLimitText,
  getWarningColorClasses,
} from "@/lib/utils/station.utils";
import type { Station } from "@/types/station.types";

interface RealtimeMetricsGridProps {
  station: Station;
}

export function RealtimeMetricsGrid({ station }: RealtimeMetricsGridProps) {
  const measuringLogs = station.lastLog?.measuringLogs || {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {station.measuringList
        .filter((item) => measuringLogs[item.key])
        .map((metricConfig) => {
          const log = measuringLogs[metricConfig.key];
          const formattedValue = new Intl.NumberFormat("vi-VN", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 2,
          }).format(log.value);

          return (
            <div
              key={metricConfig.key}
              className={`${getWarningColorClasses(
                log.warningLevel || "GOOD"
              )} p-4 rounded flex flex-col justify-center items-center text-center h-36`}
            >
              <h3 className="text-lg font-bold truncate w-full uppercase">
                {metricConfig.name || metricConfig.key}
              </h3>
              <p className="text-2xl font-bold">
                {formattedValue} {metricConfig.unit}
              </p>
              <p className="text-sm mt-1">
                {formatLimitText(log.minLimit, log.maxLimit)}
              </p>
            </div>
          );
        })}
    </div>
  );
}
