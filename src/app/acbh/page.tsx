"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { renderLimit } from "@/lib/helper";
import Image from "next/image";

export default function StationLogPage() {
  const [station, setStation] = useState<Station | null>(null);

  useEffect(() => {
    axios
      .get("/api/station-log/acbh")
      .then((res) => setStation(res.data.data[0]))
      .catch((err) => console.error(err));
  }, []);

  if (!station) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span>Đang tải dữ liệu...</span>
      </div>
    );
  }

  const { measuringLogs = {}, receivedAt } = station.lastLog || {};

  return (
    <div className="min-h-screen p-6">
      <Card className="col-span-full shadow-none border-none">
        <CardContent className="p-0 mb-6">
          <div className="flex items-center gap-4">
            <Image
              src="/acbh.png"
              alt="Logo"
              width={150}
              height={51}
              loading="eager"
            />
            <div>
              <h2 className="text-3xl font-extrabold">
                {station.name} - Lúc{" "}
                {new Intl.DateTimeFormat("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }).format(new Date(receivedAt ?? ""))}
              </h2>
              <p className="text-xl font-semibold mt-1">
                Địa chỉ: {station.address}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {Object.entries(measuringLogs).map(([key, value]) => {
          const matched = station.measuringList.find((m) => m.key === key);
          const unit = matched?.unit || "";
          const name = matched?.name || key;

          const formattedValue = new Intl.NumberFormat("vi-VN", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 2,
          }).format(value.value);

          return (
            <div
              key={key}
              className="bg-[#2196f3] p-4 text-white rounded flex flex-col justify-center items-center text-center h-36"
            >
              <h3 className="text-lg font-bold truncate w-full uppercase">
                {name}
              </h3>
              <p className="text-2xl font-bold">
                {formattedValue} {unit}
              </p>
              <p className="text-sm mt-1">
                {renderLimit(value.minLimit, value.maxLimit)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <h4 className="font-bold mb-4 text-lg underline">CHÚ THÍCH</h4>
        <div className="flex flex-wrap gap-4 text-base">
          <div className="bg-[#007bff] text-white px-6 py-2 rounded font-bold">
            NẰM TRONG GIỚI HẠN CHO PHÉP
          </div>
          <div className="bg-[#f57c00] text-white px-6 py-2 rounded font-bold">
            CHUẨN BỊ VƯỢT GIỚI HẠN CHO PHÉP
          </div>
          <div className="bg-[#d32f2f] text-white px-6 py-2 rounded font-bold">
            VƯỢT NGƯỠNG GIỚI HẠN CHO PHÉP
          </div>
        </div>
      </div>
    </div>
  );
}
