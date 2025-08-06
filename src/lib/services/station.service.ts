import axios from "axios";
import type { Station, StationDataAverage } from "@/types/station.types";

const api = axios.create({
  // Bạn có thể đặt baseURL hoặc các headers mặc định ở đây nếu cần
});

/**
 * Lấy danh sách tất cả các trạm.
 * TODO: Thay thế việc lấy phần tử [1] bằng cách lọc theo ID ở phía client hoặc
 * tạo một endpoint mới để lấy thông tin của một trạm duy nhất.
 */
export async function getStations(): Promise<Station[]> {
  const response = await api.get<{ data: Station[] }>("/api/station-log");
  return response.data.data;
}

/**
 * Lấy dữ liệu trung bình cho một trạm cụ thể.
 * @param apiPath - Đoạn path API duy nhất của trạm (ví dụ: 'DN_AMAT_NUOAMA')
 */
export async function getStationDataAverage(
  apiPath: string
): Promise<StationDataAverage[]> {
  const response = await api.get<{ data: StationDataAverage[] }>(
    `/api/data-average/${apiPath}`
  );
  return response.data.data;
}
