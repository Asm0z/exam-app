import { getUserData } from "@/lib/Action/get-user-data";
import { Exam, ExamsData } from "@/lib/types/exams";
import { Timer } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function ExamsPage() {
  const userData = await getUserData();
  const token = userData?.accessToken;
  if (!token) {
    throw new Error("not authorized, please Login!");
  }
  const res = await fetch(`${process.env.URL}/exams`, {
    method: "GET",
    headers: {
      token: token,
    },
  });
  const payload: ExamsData = await res.json();
  const data: Exam[] = payload.exams
  return (
    <div className="flex flex-col items-center my-6 p-6 space-y-6 font-(family-name:--font-geist-mono) bg-white">
      {data.map((exam) => {
        return (
          <Link href={`/exams/${exam._id}?title=${encodeURIComponent(exam.title)}`} key={exam._id} className='w-full h-full'>
            <div className="flex justify-between w-full p-4 bg-blue-50">
              <div>
                <h2 className=" font-semibold text-xl text-blue-600">
                  {exam.title}
                </h2>
                <h3 className="text-gray-500">
                  {exam.numberOfQuestions} Questions
                </h3>
              </div>
              <div className="flex items-center">
                <Timer />
                <h3 className="font-medium text-gray-800 ms-2">
                  Duration: {exam.duration} minutes
                </h3>
              </div>
            </div>
          </Link>
        );
      })}
      <h4 className="text-gray-600 text-center">End of list</h4>
    </div>
  );
}
