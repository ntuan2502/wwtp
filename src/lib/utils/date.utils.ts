// Các tùy chọn chung cho việc định dạng theo chuẩn Việt Nam
const COMMON_VN_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "Asia/Ho_Chi_Minh",
};

/**
 * Chuyển đổi một chuỗi ngày giờ UTC thành chuỗi ngày (dd/mm/yyyy) theo múi giờ Việt Nam.
 * @param utcDateString - Chuỗi ngày giờ theo chuẩn ISO (UTC).
 * @returns Chuỗi ngày đã được định dạng hoặc chuỗi rỗng nếu không hợp lệ.
 */
export function formatDateToVN(utcDateString?: string): string {
  if (!utcDateString) return "";

  try {
    // Chỉ cần truyền các tùy chọn chung
    return new Date(utcDateString).toLocaleDateString(
      "vi-VN",
      COMMON_VN_FORMAT_OPTIONS
    );
  } catch (error) {
    console.error(
      `Failed to format date string: "${utcDateString}". Error:`,
      error
    );
    return ""; // Thống nhất trả về chuỗi rỗng
  }
}

/**
 * Chuyển đổi một chuỗi ngày giờ UTC thành chuỗi ngày giờ (dd/mm/yyyy hh:mm) theo múi giờ Việt Nam.
 * @param utcDateString - Chuỗi ngày giờ theo chuẩn ISO (UTC).
 * @returns Chuỗi ngày giờ đã được định dạng hoặc chuỗi rỗng nếu không hợp lệ.
 */
export function formatDateTimeToVN(utcDateString?: string): string {
  if (!utcDateString) return "";

  try {
    // Kết hợp tùy chọn chung với tùy chọn riêng cho giờ và phút
    const options: Intl.DateTimeFormatOptions = {
      ...COMMON_VN_FORMAT_OPTIONS,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("vi-VN", options).format(
      new Date(utcDateString)
    );
  } catch (error) {
    console.error(
      `Failed to format date-time string: "${utcDateString}". Error:`,
      error
    );
    return ""; // Thống nhất trả về chuỗi rỗng
  }
}
