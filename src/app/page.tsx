import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Link href="/acbh">
        <Button variant="default" className="hover:cursor-pointer">ACBH WWTP</Button>
      </Link>
    </div>
  );
}
