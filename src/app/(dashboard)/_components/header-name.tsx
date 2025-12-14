"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { BookOpenCheck, CircleQuestionMark, GraduationCap, UserRound } from "lucide-react";

export default function HeaderName() {
  // Navigation
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // variables
  let icon = null;
  let pageName = "";

  // route conditionals
  if (pathname ==="/") {
    icon = <GraduationCap />;
    pageName = "Diplomas";
  } else if (pathname === "/exams"){
    icon = <BookOpenCheck />;
    pageName = "Exams";
  } else if (pathname.startsWith("/exam")){
    icon = <CircleQuestionMark />;
    // pageName = `[]Questions`;
    const examTitle = searchParams.get("title");
    pageName = examTitle
      ? `[${examTitle}] Questions`
      : "Exam Questions";
  } else if (pathname.startsWith("/account")) {
    icon = <UserRound />;
    pageName = "Account Settings";
  }


  return (
    <div className="flex items-center bg-blue-600 p-4 text-white flex-1 font-semibold text-3xl gap-3">
      {icon}
      <h2>{pageName}</h2>
    </div>
  );
}
