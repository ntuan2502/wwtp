import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const apiPath = searchParams.get("apiPath"); // nhận apiPath từ FE

  const token = process.env.API_TOKEN!;

  const url = "https://global-api.ilotusland.com/station-auto/last-log";

  const res = await fetch(url, {
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();

  return NextResponse.json(data);
}
