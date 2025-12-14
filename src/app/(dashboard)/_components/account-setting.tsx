"use client";
import { CircleUserRound, Lock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountSetting() {
  // Get current pathname
  const pathname = usePathname();

  // Active link logic
  const active = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
      ? "bg-blue-100 text-blue-600"
      : "text-gray-500";
  };

  return (
      <div className="m-6">
        {/* Profile Link */}
        <Link href={"/account/profile"} className={`flex p-4 ${active("/account/profile")}`}>
          <CircleUserRound />
          <h2 className="ms-3 font-(family-name:--font-geist-mono) text-lg">
            Profile
          </h2>
        </Link>

        {/* Change password link */}
        <Link
          href={"/account/changePassword"}
          className={`flex p-4 ${active("/account/changePassword")}`}
        >
          <Lock />
          <h2 className="ms-3 font-(family-name:--font-geist-mono) text-lg">
            Change Password
          </h2>
        </Link>
      </div>
  );
}
