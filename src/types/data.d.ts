type MeasuringLog = {
  value: number;
  statusDevice?: number;
  minLimit?: number;
  maxLimit?: number;
};

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
