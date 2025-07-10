"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getStatusProps, renderLimit } from "@/lib/helper";
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
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="text-sm text-gray-500">Đang tải dữ liệu...</span>
      </div>
    );
  }

  const { measuringLogs = {}, receivedAt } = station.lastLog || {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
      <Card className="col-span-full">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{station.name}</h2>
          <p className="text-muted-foreground text-sm mb-1">
            {station.address}
          </p>
          <p className="text-sm text-gray-500">
            Ngày cập nhật:{" "}
            {new Intl.DateTimeFormat("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }).format(new Date(receivedAt ?? ""))}
          </p>
        </CardContent>
      </Card>

      {Object.entries(measuringLogs).map(([key, value]) => {
        const matched = station.measuringList.find((m) => m.key === key);
        const unit = matched?.unit || "";
        const name = matched?.name || key;

        const { color, tooltip } = getStatusProps(value.statusDevice);

        const formattedValue = new Intl.NumberFormat("vi-VN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value.value);

        return (
          <Card key={key} className="border border-green-500">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-semibold text-green-600">
                    {name}
                  </h3>
                  <p className="text-2xl font-bold text-green-700">
                    {formattedValue} {unit}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {renderLimit(value.minLimit, value.maxLimit)}
                  </p>
                </div>
                <span
                  className={`w-4 h-4 rounded-full mt-1 ${color}`}
                  title={tooltip}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
