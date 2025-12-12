import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen gap-2">
      <Link href="/acbh">
        <Button variant="default" className="hover:cursor-pointer">
          ACBH WWTP
        </Button>
      </Link>
      <Link href="/achl">
        <Button variant="default" className="hover:cursor-pointer">
          ACHL WWTP
        </Button>
      </Link>
      <Link href="/aclt">
        <Button variant="default" className="hover:cursor-pointer">
          ACLT WWTP
        </Button>
      </Link>
    </div>
  );
}
