import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const measuringList = [
      "pH",
      "Temp",
      "COD",
      "TSS",
      "NH4",
      "FLOWIN",
      "FLOWIN1",
      "FLOWIN2",
      "FLOWIN3",
      "FLOWOUT",
    ];

    const getVNDate = (offsetDays = 0) => {
      const now = new Date();
      const vnDate = new Date(
        new Date(
          now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
        ).getTime()
      );
      vnDate.setDate(vnDate.getDate() - offsetDays);
      return vnDate;
    };

    const toDateVN = getVNDate(1); // hôm qua theo giờ VN
    toDateVN.setHours(23, 59, 59, 999);

    const fromDateVN = new Date(toDateVN.getTime() - 30 * 24 * 60 * 60 * 1000);
    const toDateUTC = new Date(toDateVN.toISOString()); // giữ nguyên
    const fromDateUTC = new Date(fromDateVN.toISOString());

    const params = {
      from: fromDateUTC.toISOString(),
      to: toDateUTC.toISOString(),
      measuringList: measuringList.join(","),
      standards: "",
      isFilter: false,
      status: "GOOD,EXCEEDED,EXCEEDED_PREPARING",
      groupType: "custom",
      timeInterval: 1440,
      page: 1,
      itemPerPage: 50,
    };

    const response = await axios.get(
      "https://global-api.ilotusland.com/data-insight/report/data-average/DN_AMAT_NUOAMA",
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_API_TOKEN!,
        },
        params,
      }
    );

    return NextResponse.json(response.data);
  } catch (err) {
    console.error("Error fetching data average", err);
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 }
    );
  }
}
