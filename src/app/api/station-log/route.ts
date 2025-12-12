import { stationsConfig } from "@/config/stations.config";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const apiPath = searchParams.get("apiPath"); // nhận apiPath từ FE

  const primaryToken = process.env.NEXT_PUBLIC_API_TOKEN!;
  const fallbackToken = process.env.NEXT_PUBLIC_API_TOKEN_ACLT!;

  // Nếu apiPath là ACLT → chọn token ACLT
  const token =
    apiPath === stationsConfig["aclt"].apiPath
      ? fallbackToken
      : primaryToken;

  const url = "https://global-api.ilotusland.com/station-auto/last-log";

  const res = await fetch(url, {
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();

  return NextResponse.json(data);
}
