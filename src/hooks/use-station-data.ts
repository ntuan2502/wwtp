import useSWR from "swr";
import {
  getStations,
  getStationDataAverage,
} from "@/lib/services/station.service";
import type { Station, StationDataAverage } from "@/types/station.types";

const REFRESH_INTERVAL =
  Number(process.env.NEXT_PUBLIC_REFRESH_TIME) || 60000;

interface UseStationDataResult {
  station: Station | null;
  data: StationDataAverage[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook để lấy và cập nhật dữ liệu cho một trạm cụ thể.
 * Sử dụng SWR cho auto-refresh, dedup, retry, và pause khi tab ẩn.
 */
export function useStationData(
  stationApiPath: string,
  stationKey: string
): UseStationDataResult {
  // Fetch realtime station info — auto refresh mỗi 30s/60s
  const {
    data: allStations,
    error: stationError,
    isLoading: stationLoading,
  } = useSWR(
    stationApiPath ? `station-log/${stationApiPath}` : null,
    () => getStations(stationApiPath),
    {
      refreshInterval: REFRESH_INTERVAL,
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  );

  // Fetch historical data — chỉ lấy 1 lần (dữ liệu 30 ngày, không cần refresh liên tục)
  const {
    data: historicalData,
    error: dataError,
    isLoading: dataLoading,
  } = useSWR(
    stationApiPath ? `data-average/${stationApiPath}` : null,
    () => getStationDataAverage(stationApiPath),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  // Tìm station theo key ổn định
  const station =
    allStations?.find((s) => s.key === stationKey) ?? null;

  const isLoading = stationLoading || dataLoading;

  // Tổng hợp error message
  const errorMsg = stationError
    ? stationError.message
    : dataError
      ? dataError.message
      : stationApiPath && !stationLoading && allStations && !station
        ? `Không tìm thấy trạm với key "${stationKey}".`
        : null;

  return {
    station,
    data: historicalData ?? [],
    isLoading,
    error: errorMsg,
  };
}
