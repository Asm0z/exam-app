import React, { Suspense } from "react";
import Sidebar from "./_components/sidebar";
import { AccountBreadcrumb } from "./_components/account-breadcrumb";
import GoBackHeader from "./_components/go-back-header";
import HeaderName from "./_components/header-name";
import SkeletonPage from "./_components/skeleton-page";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-4 min-h-screen">
      <Sidebar />
      <div className="col-span-3 flex flex-col">
        <AccountBreadcrumb />
        <div className="bg-gray-50 p-6 flex-1">
          {/* Header Navbar */}
          <div className="flex items-stretch mb-6">
            {/* Go to previous page */}
            <GoBackHeader />

            {/* pageName */}
            <HeaderName />
          </div>

          {/* pages loading */}
          <Suspense fallback={<SkeletonPage />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
