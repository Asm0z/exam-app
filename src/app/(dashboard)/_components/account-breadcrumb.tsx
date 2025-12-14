"use client";
import Link from "next/link";
import { SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function AccountBreadcrumb() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pathSegments = pathname.split("/").filter(Boolean);
  const examTitle = searchParams.get("title");

  return (
    <Breadcrumb className="m-4">
      <BreadcrumbList>
        {/* Home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.length > 0 && (
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
        )}

        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;

          let label = segment;
          if (segment === "exams") label = "Exams";
          if (segment === "account") label = "Account";

          // Special case: examId segment
          if (pathSegments[index - 1] === "exams" && examTitle) {
            return (
              <React.Fragment key={index}>
                {/* Exam title as link */}
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={pathname}>{examTitle}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>

                {/* Questions label */}
                <BreadcrumbItem>
                  <BreadcrumbPage>Questions</BreadcrumbPage>
                </BreadcrumbItem>
              </React.Fragment>
            );
          }

          // Regular breadcrumb item
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={"/" + pathSegments.slice(0, index + 1).join("/")}
                    >
                      {label.charAt(0).toUpperCase() + label.slice(1)}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
