"use client";
// Import các component mới
import { StationHeader } from "@/components/station/StationHeader";
import { RealtimeMetricsGrid } from "@/components/station/RealtimeMetricsGrid";
import { Legend } from "@/components/station/Legend";
import { HistoricalTable } from "@/components/station/HistoricalTable";

// Import các hook và config cần thiết
import { useStationData } from "@/hooks/use-station-data";
import { stationsConfig } from "@/config/stations.config";
import { use, useMemo } from "react";
import { formatDateTimeToVN } from "@/lib/utils/date.utils";

interface DynamicStationPageProps {
  params: Promise<{ stationId: string }>;
}

export default function DynamicStationPage({
  params,
}: DynamicStationPageProps) {
  const { stationId } = use(params);
  const config = stationsConfig[stationId];

  const { station, data, isLoading, error } = useStationData(
    config?.apiPath,
    config?.findStation
  );

  const formattedTime = useMemo(() => {
    const receivedAt = station?.lastLog?.receivedAt;
    return receivedAt ? formatDateTimeToVN(receivedAt) : "Không có dữ liệu";
  }, [station?.lastLog?.receivedAt]); // Tính toán lại chỉ khi receivedAt thay đổi

  // --- Render Logic ---
  if (!config) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Trạm không hợp lệ.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Đang tải dữ liệu...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Lỗi: {error}
      </div>
    );
  }

  if (!station) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Không tìm thấy dữ liệu trạm.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <StationHeader
        station={station}
        logoSrc={config.logo}
        formattedTime={formattedTime}
      />
      <RealtimeMetricsGrid station={station} />
      <Legend />
      <HistoricalTable data={data} measuringKeys={config.measuringKeys} />
    </div>
  );
}
