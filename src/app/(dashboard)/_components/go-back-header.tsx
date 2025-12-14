"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function GoBackHeader() {
  // Navigation
  const pathname = usePathname();
  const router = useRouter();

  // do not render on home page
  if (pathname === "/") return null;

  return (
    <div className=" bg-white border border-blue-600 me-3 flex justify-center items-center">
      <Button size={"icon"} variant="ghost" onClick={() => router.back()}>
        <ChevronLeft className="text-blue-600" />
      </Button>
    </div>
  );
}
