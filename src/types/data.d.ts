// type MeasuringLog = {
//   value: number;
//   statusDevice?: number;
//   minLimit?: number;
//   maxLimit?: number;
// };

type MeasuringListItem = {
  key: string;
  unit: string;
  name?: string;
};

type LastLog = {
  receivedAt: string;
  measuringLogs: Record<string, MeasuringLog>;
};

type Station = {
  name: string;
  address: string;
  lastLog?: LastLog;
  measuringList: MeasuringListItem[];
};

export type WarningLevel = "GOOD" | "EXCEEDED_PREPARING" | "EXCEEDED" | "";

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

export interface DataAverageItem {
  receivedAt: string;
  measuringLogs: {
    [key: string]: MeasuringLog | undefined;
  };
}
