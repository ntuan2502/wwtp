import { useState, useEffect } from "react";
import {
  getStations,
  getStationDataAverage,
} from "@/lib/services/station.service";
import type { Station, StationDataAverage } from "@/types/station.types";

interface UseStationDataResult {
  station: Station | null;
  data: StationDataAverage[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook để lấy và cập nhật dữ liệu cho một trạm cụ thể.
 * @param stationApiPath - Path API định danh cho trạm (ví dụ: 'acbh').
 * @param stationKey - Key ổn định của trạm từ API (ví dụ: 'DN_AMAT_NUOAMA').
 */
export function useStationData(
  stationApiPath: string,
  stationKey: string
): UseStationDataResult {
  const [station, setStation] = useState<Station | null>(null);
  const [data, setData] = useState<StationDataAverage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stationApiPath || !stationKey) {
      setIsLoading(false);
      setError("Không có định danh trạm.");
      return;
    }

    const findStation = (stations: Station[]) =>
      stations.find((s) => s.key === stationKey);

    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [allStations, dataAvg] = await Promise.all([
          getStations(stationApiPath),
          getStationDataAverage(stationApiPath),
        ]);

        const currentStation = findStation(allStations);
        if (!currentStation) {
          throw new Error(
            `Không tìm thấy trạm với key "${stationKey}".`
          );
        }

        setStation(currentStation);
        setData(dataAvg);
      } catch (err) {
        console.error("Error fetching initial station data:", err);
        setError(err instanceof Error ? err.message : "Lỗi không xác định.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();

    const intervalId = setInterval(async () => {
      try {
        const allStations = await getStations(stationApiPath);
        const updatedStation = findStation(allStations);
        if (updatedStation) {
          setStation(updatedStation);
        }
      } catch (err) {
        console.error("Error fetching station update:", err);
      }
    }, Number(process.env.NEXT_PUBLIC_REFRESH_TIME) || 60000);

    return () => clearInterval(intervalId);
  }, [stationApiPath, stationKey]);

  return { station, data, isLoading, error };
}

