import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
// Tên hàm này đã được đổi trong các file khác, hãy đảm bảo tính nhất quán
// import { fetchStationDataAverage } from "@/lib/services/dataAverageService";
import { fetchDataAverage } from "@/lib/services/dataAverageService"; // Giữ nguyên tên nếu bạn chưa đổi
import { stationsConfig } from "@/config/stations.config";

// Interface cho params khi đã được giải quyết (unwrapped)
interface ResolvedRouteParams {
  stationId: string;
}

// Interface cho props mà API Route nhận vào
interface ApiRouteProps {
  // params giờ là một Promise
  params: Promise<ResolvedRouteParams>;
}

export async function GET(request: Request, { params }: ApiRouteProps) {
  try {
    // *** THAY ĐỔI QUAN TRỌNG NHẤT TẠI ĐÂY ***
    // Sử dụng await để "mở gói" Promise và lấy object params thực sự
    const { stationId } = await params;

    // Tìm cấu hình tương ứng với ID trạm
    const config = stationsConfig[stationId];

    // Nếu không tìm thấy cấu hình, trả về lỗi 404 Not Found
    if (!config) {
      return NextResponse.json(
        { message: `Configuration for station '${stationId}' not found.` },
        { status: 404 }
      );
    }

    const data = await fetchDataAverage({
      apiPath: config.externalApiPath,
      measuringKeys: config.measuringKeys,
    });

    return NextResponse.json(data);
  } catch (error) {
    // Để cho code gọn hơn, ta có thể lấy stationId một lần nữa ở đây
    // trong trường hợp lỗi xảy ra trước khi có config
    let stationIdForErrorLog = "unknown";
    try {
      stationIdForErrorLog = (await params).stationId;
    } catch {
      // Bỏ qua nếu không lấy được params
    }

    console.error(
      `Error fetching data average for ${stationIdForErrorLog.toUpperCase()}:`,
      error
    );

    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          message: "Error fetching data from external API",
          details: error.response?.data,
        },
        { status: error.response?.status || 500 }
      );
    } else if (error instanceof Error) {
      return NextResponse.json(
        { message: "An unexpected error occurred", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
