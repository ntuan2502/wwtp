import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://global-api.ilotusland.com/station-auto/last-log",
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_TOKEN as string,
      },
    }
  );

  const data = await res.json();

  return NextResponse.json(data);
}
