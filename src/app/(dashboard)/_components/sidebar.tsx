import logo from "@/public/Final-Logo.png";
import folderLogo from "@/public/folder-code.png";
import Image from "next/image";
import UserData from "./user-data";
import NavLinks from "./nav-links";

export default function Sidebar() {
  return (
    <div className="bg-blue-50 p-10 ">
      <div className="flex flex-col justify-between h-full">
        {/* Header with logo and nav links */}
        <div>
          {/* Header */}
          <Image src={logo} alt="Exam-Logo" />
          <div className="flex items-center mt-3">
            <Image src={folderLogo} alt="Folder-Logo" width={30} height={30} />
            <h1 className="text-blue-600 font-semibold font-(family-name:--font-geist-mono) text-xl ms-3">
              Exam App
            </h1>
          </div>

          {/* Nav Links */}
          <NavLinks />
        </div>

        {/* User Data Section */}
        <UserData />
      </div>
    </div>
  );
}
