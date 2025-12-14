"use client";
import { GraduationCap, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  // Get current pathname
  const pathname = usePathname();

  // Active link logic
  const active = (href: string) => {
    if (href === "/") {
      return pathname === "/" || !pathname.startsWith("/account")
      ? "bg-blue-100 border border-blue-500 text-blue-600"
      : "text-gray-500";
    }
      return pathname.startsWith(href)
      ? "bg-blue-100 border border-blue-500 text-blue-600"
      : "text-gray-500";
  };

  return (
    <div className="mt-16 flex flex-col justify-between">
      <div>
        {/* Diploma Link */}
        <Link href={"/"} className={`flex p-4 mb-3 ${active("/")}`}>
          <GraduationCap />
          <h2 className="ms-3 font-(family-name:--font-geist-mono) text-lg">
            Diplomas
          </h2>
        </Link>

        {/* Account setting link */}
        <Link
          href={"/account"}
          className={`flex p-4 mb-3 ${active("/account")}`}
        >
          <UserRound />
          <h2 className="ms-3 font-(family-name:--font-geist-mono) text-lg">
            Account Settings
          </h2>
        </Link>
      </div>
    </div>
  );
}
