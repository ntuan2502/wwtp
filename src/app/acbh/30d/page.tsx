"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { DataAverageItem } from "@/types/data";
import { getColorByWarningLevel } from "@/lib/helper";

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

const formatDateVN = (utcDateString: string) => {
  return new Date(utcDateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  });
};

export default function DataAverageTable() {
  const [data, setData] = useState<DataAverageItem[]>([]);

  useEffect(() => {
    axios
      .get<{ data: DataAverageItem[] }>("/api/data-average")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bảng Giá Trị Trung Bình</h2>
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

      <div className="mt-8">
        <h4 className="font-bold mb-2">Chú thích mức cảnh báo</h4>
        <div className="flex gap-4 flex-wrap">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded font-semibold">
            Nằm trong giới hạn cho phép
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded font-semibold">
            Chuẩn bị vượt giới hạn cho phép
          </div>
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded font-semibold">
            Vượt giới hạn cho phép
          </div>
        </div>
      </div>
    </div>
  );
}
