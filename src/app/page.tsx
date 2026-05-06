import Image from "next/image";
import Link from "next/link";
import { stationsConfig } from "@/config/stations.config";
import { MapPin, ArrowRight } from "lucide-react";

export default function Home() {
  const stations = Object.entries(stationsConfig);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-blue-50">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        HỆ THỐNG QUAN TRẮC NƯỚC THẢI
      </h1>
      <p className="text-muted-foreground mb-10">
        AMATA Vietnam — Wastewater Online Monitoring
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {stations.map(([id, config]) => (
          <Link
            key={id}
            href={`/${id}`}
            className="group block rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-200"
          >
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src={config.logo}
                  alt={config.name}
                  width={120}
                  height={41}
                  className="shrink-0"
                />
                <span className="ml-auto text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {id.toUpperCase()}
                </span>
              </div>

              <h2 className="text-sm font-bold text-slate-700 leading-snug line-clamp-2">
                {config.name}
              </h2>

              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin className="size-3.5 mt-0.5 shrink-0" />
                <span className="line-clamp-2">{config.address}</span>
              </div>

              <div className="flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all duration-200">
                Xem chi tiết
                <ArrowRight className="size-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
