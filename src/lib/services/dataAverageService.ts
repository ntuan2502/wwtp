import { stationsConfig } from "@/config/stations.config";
import { FetchStationDataAverageParams } from "@/types/station.types";
import axios from "axios";

// Hàm này sẽ chứa toàn bộ logic chung
export async function fetchDataAverage({
  apiPath,
  measuringKeys,
}: FetchStationDataAverageParams) {
  // Hàm tính toán ngày giờ được giữ nguyên
  const getVNDate = (offsetDays = 0) => {
    const now = new Date();
    // Lấy đúng ngày giờ ở múi giờ Việt Nam
    const vnDate = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
    );
    vnDate.setDate(vnDate.getDate() - offsetDays);
    return vnDate;
  };

  // Tính toán khoảng thời gian 30 ngày trước, kết thúc vào cuối ngày hôm qua
  const toDateVN = getVNDate(1); // Ngày hôm qua theo giờ VN
  toDateVN.setHours(23, 59, 59, 999); // Set về cuối ngày

  // Lấy ngày bắt đầu là 30 ngày trước ngày kết thúc
  const fromDateVN = new Date(toDateVN.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Chuyển đổi về chuỗi ISO theo múi giờ UTC để gửi lên API
  const toDateUTC = toDateVN.toISOString();
  const fromDateUTC = fromDateVN.toISOString();

  // Tạo các tham số cho request, nhận measuringList từ tham số đầu vào
  const params = {
    from: fromDateUTC,
    to: toDateUTC,
    measuringList: measuringKeys.join(","),
    standards: "",
    isFilter: false,
    status: "GOOD,EXCEEDED,EXCEEDED_PREPARING",
    groupType: "custom",
    timeInterval: 1440,
    page: 1,
    itemPerPage: 50,
  };

  // Xây dựng URL động dựa trên apiPath được truyền vào
  const apiUrl = `https://global-api.ilotusland.com/data-insight/report/data-average/${apiPath}`;

  // Gọi API bằng axios
  const response = await axios.get(apiUrl, {
    headers: {
      // Đảm bảo biến môi trường được định nghĩa và không rỗng
      Authorization:
        apiPath != stationsConfig["aclt"].externalApiPath
          ? process.env.NEXT_PUBLIC_API_TOKEN!
          : process.env.NEXT_PUBLIC_API_TOKEN_ACLT!,
    },
    params,
  });

  // Trả về dữ liệu từ response
  return response.data;
}
