"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  formatDateVN,
  getColorByWarningLevel,
  renderLimit,
} from "@/lib/helper";
import Image from "next/image";
import { DataAverageItem, Station } from "@/types/data";

const measuringKeys = [
  "COD",
  "FLOWIN",
  "FLOWIN1",
  "FLOWIN2",
  "FLOWIN3",
  "FLOWOUT",
  "NH4",
  "TSS",
  "Temp",
  "pH",
];

export default function StationLogPage() {
  const [station, setStation] = useState<Station | null>(null);
  const [data, setData] = useState<DataAverageItem[]>([]);

  const fetchStation = async () => {
    try {
      const res = await axios.get("/api/station-log/acbh");
      setStation(res.data.data[0]);
    } catch (err) {
      console.error("Error fetching station:", err);
    }
  };

  const fetchDataAverage = async () => {
    try {
      const res = await axios.get<{ data: DataAverageItem[] }>(
        "/api/data-average"
      );
      setData(res.data.data);
    } catch (err) {
      console.error("Error fetching data average:", err);
    }
  };

  useEffect(() => {
    fetchStation();
    const intervalId = setInterval(
      fetchStation,
      Number(process.env.NEXT_PUBLIC_REFRESH_TIME) || 60000
    );
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchDataAverage();
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
      {/* Header */}
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

      {/* Realtime Box */}
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
              className="bg-[#2196f3] text-white p-4 rounded flex flex-col justify-center items-center text-center h-36"
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

      {/* Legend */}
      <div className="mt-10">
        <h4 className="font-bold mb-4 text-lg underline">CHÚ THÍCH</h4>
        <div className="flex flex-wrap gap-4 text-base">
          <div
            className={`${getColorByWarningLevel(
              "GOOD"
            )} px-6 py-2 rounded font-bold`}
          >
            NẰM TRONG GIỚI HẠN CHO PHÉP
          </div>
          <div
            className={`${getColorByWarningLevel(
              "EXCEEDED_PREPARING"
            )} px-6 py-2 rounded font-bold`}
          >
            CHUẨN BỊ VƯỢT GIỚI HẠN CHO PHÉP
          </div>
          <div
            className={`${getColorByWarningLevel(
              "EXCEEDED"
            )} px-6 py-2 rounded font-bold`}
          >
            VƯỢT NGƯỠNG GIỚI HẠN CHO PHÉP
          </div>
        </div>
      </div>

      {/* Historical Table */}
      <div className="pt-6">
        <h2 className="text-2xl font-bold mb-4">Dữ liệu 30 ngày gần nhất</h2>
        <table className="table-auto w-full text-center border border-collapse border-gray-300">
          <thead className="bg-gray-100 font-semibold">
            <tr>
              <th className="border px-4 py-2">Ngày</th>
              {measuringKeys.map((key) => (
                <th key={key} className="border px-4 py-2">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((day) => (
              <tr key={day.receivedAt}>
                <td className="border px-4 py-2 font-semibold">
                  {formatDateVN(day.receivedAt)}
                </td>
                {measuringKeys.map((key) => {
                  const log = day.measuringLogs?.[key];
                  const value = log?.value?.toFixed(2) ?? "-";
                  const level = log?.warningLevel ?? "";
                  return (
                    <td
                      key={key}
                      className={`border px-4 py-2 ${getColorByWarningLevel(
                        level
                      )}`}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
