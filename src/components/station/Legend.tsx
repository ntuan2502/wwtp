import { getWarningColorClasses } from "@/lib/utils/station.utils";
import type { WarningLevel } from "@/types/station.types";

const legendItems: { level: WarningLevel; text: string }[] = [
  { level: "GOOD", text: "NẰM TRONG GIỚI HẠN CHO PHÉP" },
  { level: "EXCEEDED_PREPARING", text: "CHUẨN BỊ VƯỢT GIỚI HẠN CHO PHÉP" },
  { level: "EXCEEDED", text: "VƯỢT NGƯỠNG GIỚI HẠN CHO PHÉP" },
];

export function Legend() {
  return (
    <div className="mt-10">
      <h4 className="font-bold mb-4 text-lg underline">CHÚ THÍCH</h4>
      <div className="flex flex-wrap gap-4 text-base">
        {legendItems.map((item) => (
          <div
            key={item.level}
            className={`${getWarningColorClasses(
              item.level
            )} px-6 py-2 rounded font-bold`}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
