import { measuringKeysACBH, measuringKeysACHL, measuringKeysACLT } from "@/constants";

export interface StationConfig {
  name: string;
  address: string;
  logo: string;
  apiPath: string;
  externalApiPath: string;
  measuringKeys: string[];
  stationKey: string; // Key ổn định từ API dùng để tìm đúng station
}

export const stationsConfig: Record<string, StationConfig> = {
  acbh: {
    name: "NHÀ MÁY XỬ LÝ NƯỚC THẢI - CÔNG TY CỔ PHẦN ĐÔ THỊ AMATA BIÊN HÒA",
    address: "Khu Công Nghiệp Long Bình (Amata), Phường Long Bình, Thành phố Đồng Nai, Việt Nam",
    logo: "/acbh.png",
    apiPath: "acbh",
    externalApiPath: "DN_AMAT_NUOAMA",
    measuringKeys: measuringKeysACBH,
    stationKey: "DN_AMAT_NUOAMA",
  },
  achl: {
    name: "NHÀ MÁY XỬ LÝ NƯỚC THẢI - CÔNG TY CỔ PHẦN ĐÔ THỊ AMATA HẠ LONG",
    address:
      "Khu Công Nghiệp Sông Khoai, Phường Hiệp Hòa, Tỉnh Quảng Ninh, Việt Nam",
    logo: "/achl.png",
    apiPath: "achl",
    externalApiPath: "QN_AMTA_NUONT1",
    measuringKeys: measuringKeysACHL,
    stationKey: "QN_AMTA_NUONT1",
  },
  aclt: {
    name: "NHÀ MÁY XỬ LÝ NƯỚC THẢI - CÔNG TY CỔ PHẦN ĐÔ THỊ AMATA LONG THÀNH",
    address:
      "Khu Công Nghiệp Công Nghệ Cao Long Thành, Phường Long Thành, Thành phố Đồng Nai, Việt Nam",
    logo: "/aclt.png",
    apiPath: "aclt",
    externalApiPath: "wwtp__amata_long_thanh_1",
    measuringKeys: measuringKeysACLT,
    stationKey: "wwtp__amata_long_thanh_1",
  },
};

