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
 * @param stationIdFinder - Một hàm để tìm đúng trạm từ danh sách trả về.
 */
export function useStationData(
  stationApiPath: string,
  stationIdFinder: (stations: Station[]) => Station | undefined
): UseStationDataResult {
  const [station, setStation] = useState<Station | null>(null);
  const [data, setData] = useState<StationDataAverage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Chỉ chạy khi stationApiPath có giá trị
    if (!stationApiPath) {
      setIsLoading(false);
      setError("Không có định danh trạm.");
      return;
    }

    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [allStations, dataAvg] = await Promise.all([
          getStations(stationApiPath),
          getStationDataAverage(stationApiPath),
        ]);

        const currentStation = stationIdFinder(allStations);
        if (!currentStation) {
          throw new Error(`Không tìm thấy trạm với định danh phù hợp.`);
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
        const updatedStation = stationIdFinder(allStations);
        if (updatedStation) {
          setStation(updatedStation);
        }
      } catch (err) {
        console.error("Error fetching station update:", err);
      }
    }, Number(process.env.NEXT_PUBLIC_REFRESH_TIME) || 60000);

    return () => clearInterval(intervalId);
  }, [stationApiPath, stationIdFinder]); // Hook sẽ chạy lại nếu path thay đổi

  return { station, data, isLoading, error };
}
