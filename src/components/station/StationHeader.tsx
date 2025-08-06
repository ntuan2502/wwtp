import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { Station } from "@/types/station.types";

interface StationHeaderProps {
  station: Station;
  logoSrc: string; // Nhận logo từ props để làm cho component linh hoạt hơn
  formattedTime: string; // Nhận chuỗi đã được định dạng
}

export function StationHeader({
  station,
  logoSrc,
  formattedTime,
}: StationHeaderProps) {
  return (
    <Card className="col-span-full shadow-none border-none">
      <CardContent className="p-0 mb-6">
        <div className="flex items-center gap-4">
          <Image
            src={logoSrc}
            alt="Logo Trạm"
            width={150}
            height={51}
            priority
          />
          <div>
            <h2 className="text-3xl font-extrabold">
              {station.name} - Lúc {formattedTime}
            </h2>
            <p className="text-xl font-semibold mt-1">
              Địa chỉ: {station.address}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
