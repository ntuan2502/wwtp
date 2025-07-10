export function getStatusProps(statusDevice?: number) {
  switch (statusDevice) {
    case 0:
      return { color: "bg-green-500", tooltip: "Bình thường" };
    case 1:
      return { color: "bg-yellow-400", tooltip: "Cảnh báo" };
    default:
      return { color: "bg-gray-400", tooltip: "Không xác định" };
  }
}

export function renderLimit(min?: number, max?: number) {
  if (min !== undefined && max !== undefined)
    return `Giới hạn: ${min} → ${max}`;
  if (min !== undefined) return `Giới hạn: ≥ ${min}`;
  if (max !== undefined) return `Giới hạn: ≤ ${max}`;
  return "Không có giới hạn";
}
