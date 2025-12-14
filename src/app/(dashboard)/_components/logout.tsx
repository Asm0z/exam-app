"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutBtn() {
  // Logout function
  function handleLogout() {
    signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <div className="flex items-center m-6 p-4 text-red-600 bg-red-50" onClick={handleLogout}>
      <LogOut />
      <h2 className="ms-3 font-(family-name:--font-geist-mono)">Logout</h2>
    </div>
  );
}
