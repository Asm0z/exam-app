import React from "react";
import AccountSetting from "../_components/account-setting";
import LogoutBtn from "../_components/logout";


export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="grid grid-cols-3 min-h-screen">
      <div className="flex flex-col justify-between h-full bg-white">
        <AccountSetting />
        <LogoutBtn />
      </div>
      <div className="col-span-2 flex flex-col">{children}</div>
    </div>
  );
}
