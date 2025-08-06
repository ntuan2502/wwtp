import { measuringKeysACBH, measuringKeysACHL } from "@/constants"; // Giả sử bạn có cả ACHL
import { Station } from "@/types/station.types";

export interface StationConfig {
  name: string;
  logo: string;
  apiPath: string;
  externalApiPath: string; // Dùng cho Backend gọi API bên ngoài (ví dụ: 'DN_AMAT_NUOAMA')
  measuringKeys: string[];
  // Hàm để tìm đúng station từ API trả về
  findStation: (stations: Station[]) => Station | undefined;
}

export const stationsConfig: Record<string, StationConfig> = {
  acbh: {
    name: "Trạm Nước Thải ACBH",
    logo: "/acbh.png",
    apiPath: "acbh", // Giống với key
    externalApiPath: "DN_AMAT_NUOAMA", // <-- Thêm vào đây
    measuringKeys: measuringKeysACBH,
    findStation: (stations) => stations[1], // **Cảnh báo**: Vẫn là magic number, cần thay bằng lọc ID
  },
  achl: {
    name: "Trạm Nước Thải ACHL",
    logo: "/achl.png",
    apiPath: "achl",
    externalApiPath: "QN_AMTA_NUONT1", // <-- Thêm vào đây
    measuringKeys: measuringKeysACHL,
    findStation: (stations) => stations[0],
  },
};
