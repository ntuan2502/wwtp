import { WarningLevel } from "@/types/data";

export function renderLimit(min?: number, max?: number) {
  if (min !== undefined && max !== undefined)
    return `Giới hạn: ${min} → ${max}`;
  if (min !== undefined) return `Giới hạn: ≥ ${min}`;
  if (max !== undefined) return `Giới hạn: ≤ ${max}`;
  return "Không có giới hạn";
}

export function getColorByWarningLevel(level: WarningLevel) {
  switch (level) {
    case "GOOD":
      return "bg-[#2196f3] text-white";
    case "EXCEEDED_PREPARING":
      return "bg-[#f57c00] text-white";
    case "EXCEEDED":
      return "bg-[#d32f2f] text-white";
    default:
      return "";
  }
}

export function formatDateVN(utcDateString: string) {
  return new Date(utcDateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  });
}
