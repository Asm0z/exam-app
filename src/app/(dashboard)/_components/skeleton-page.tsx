import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SkeletonPage() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {[...Array(6)].map((_, index) => {
          return <Skeleton key={index} className="h-40" />;
        })}
      </div>
    </div>
  );
}
