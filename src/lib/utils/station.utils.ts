import type { WarningLevel } from "@/types/station.types";

/**
 * Hiển thị chuỗi giới hạn min/max một cách thân thiện.
 * @param min - Giá trị giới hạn dưới.
 * @param max - Giá trị giới hạn trên.
 * @returns Chuỗi định dạng về giới hạn.
 */
export function formatLimitText(min?: number, max?: number): string {
  if (min !== undefined && max !== undefined) {
    return `Giới hạn: ${min} → ${max}`;
  }
  if (min !== undefined) {
    return `Giới hạn: ≥ ${min}`;
  }
  if (max !== undefined) {
    return `Giới hạn: ≤ ${max}`;
  }
  return "Không có giới hạn";
}

const warningColorMap: Record<WarningLevel, string> = {
  GOOD: "bg-[#2196f3] text-white",
  EXCEEDED_PREPARING: "bg-[#f57c00] text-white",
  EXCEEDED: "bg-[#d32f2f] text-white",
  "": "bg-gray-200 text-gray-800",
};

export function getWarningColorClasses(level: WarningLevel): string {
  return warningColorMap[level] || warningColorMap[""];
}
