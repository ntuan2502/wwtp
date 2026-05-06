import { AlertCircle, Loader2, SearchX } from "lucide-react";

type StatusType = "loading" | "error" | "empty";

interface StatusScreenProps {
  type: StatusType;
  message?: string;
}

const statusConfig: Record<
  StatusType,
  { icon: typeof Loader2; defaultMessage: string; iconClassName: string; textClassName: string }
> = {
  loading: {
    icon: Loader2,
    defaultMessage: "Đang tải dữ liệu...",
    iconClassName: "text-muted-foreground animate-spin",
    textClassName: "text-muted-foreground",
  },
  error: {
    icon: AlertCircle,
    defaultMessage: "Đã xảy ra lỗi.",
    iconClassName: "text-destructive",
    textClassName: "text-destructive",
  },
  empty: {
    icon: SearchX,
    defaultMessage: "Không tìm thấy dữ liệu.",
    iconClassName: "text-muted-foreground",
    textClassName: "text-muted-foreground",
  },
};

export function StatusScreen({ type, message }: StatusScreenProps) {
  const config = statusConfig[type];
  const Icon = config.icon;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-3">
      <Icon className={`size-10 ${config.iconClassName}`} />
      <p className={`text-lg ${config.textClassName}`}>
        {message || config.defaultMessage}
      </p>
    </div>
  );
}
