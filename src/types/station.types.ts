/**
 * Định nghĩa cấp độ cảnh báo.
 */
export type WarningLevel = "GOOD" | "EXCEEDED_PREPARING" | "EXCEEDED" | "";

/**
 * Đại diện cho một chỉ số đo lường trong danh sách cấu hình của trạm.
 */
export interface MeasuringListItem {
  key: string;
  unit: string;
  name?: string;
}

/**
 * Đại diện cho một log đo lường tại một thời điểm.
 */
export interface MeasuringLog {
  value: number;
  statusDevice?: number;
  minLimit?: number;
  maxLimit?: number;
  min?: number;
  max?: number;
  isMerged?: boolean;
  qcvn?: null | string;
  warningLevel?: WarningLevel;
}

/**
 * Đại diện cho log gần nhất của một trạm.
 */
export interface LastLog {
  receivedAt: string;
  measuringLogs: Record<string, MeasuringLog>;
}

/**
 * Đại diện cho thông tin cơ bản của một trạm quan trắc.
 */
export interface Station {
  name: string;
  address: string;
  lastLog?: LastLog;
  measuringList: MeasuringListItem[];
}

/**
 * Đại diện cho một bản ghi dữ liệu trung bình của trạm tại một thời điểm.
 */
export interface StationDataAverage {
  receivedAt: string;
  measuringLogs: {
    [key: string]: MeasuringLog | undefined;
  };
}

/**
 * Các tham số cần thiết để gọi API lấy dữ liệu trung bình của trạm.
 */
export interface FetchStationDataAverageParams {
  apiPath: string;
  measuringKeys: string[];
}
