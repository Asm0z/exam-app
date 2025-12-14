"use client";
import { EllipsisVertical, LogOut, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export function DropdownList() {
  // Logout function
  function handleLogout() {
    signOut({
      callbackUrl: "/login",
    });
  }
  return (
    <DropdownMenu modal={false}>
      {/* Dropdown icon */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" aria-label="Open menu" size="icon">
          <EllipsisVertical className="text-gray-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          {/* Account list */}
          <DropdownMenuItem>
            <UserRound />
            <h2 className="ms-3 font-(family-name:--font-geist-mono) text-gray-800">
              Account
            </h2>
          </DropdownMenuItem>

          {/* Logout list */}
          <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
            <LogOut />
            <h2 className="ms-3 font-(family-name:--font-geist-mono)">
              Logout
            </h2>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
