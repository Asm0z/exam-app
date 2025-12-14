import Image from "next/image";
import userImg from "@/public/user-image.jpg";
import { DropdownList } from "./dropdown-list";
import { GetUserInfo } from "@/lib/Action/auth.api";

export default async function UserData() {
  // Get user data
  const payload = await GetUserInfo();

  if ("code" in payload) {
    throw new Error(payload.message);
  }
  const userData = payload.user;

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        {/* Static image */}
        <div className=" border border-blue-600 w-14 h-14 relative">
          <Image
            src={userImg}
            alt="user-image"
            fill
            className=" object-cover"
          />
        </div>

        {/* User information */}
        <div className="flex flex-col font-(family-name:--font-geist-mono)">
          <h2 className="text-blue-600 font-medium  text-lg">
            {userData.firstName}
          </h2>
          <h3 className="text-gray-500 break-all">{userData.email}</h3>
        </div>
      </div>

      {/* Account setting dropdown */}
      <DropdownList />
    </div>
  );
}
