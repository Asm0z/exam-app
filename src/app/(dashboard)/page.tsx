import { getUserData } from "@/lib/Action/get-user-data";
import { Subject, SubjectsData } from "@/lib/types/subject";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Home() {
  const userData = await getUserData();
  const token = userData?.accessToken;
  if (!token) {
    throw new Error("not authorized, please Login!");
  }
  const res = await fetch(`${process.env.URL}/subjects?page=1&limit=6`, {
    method: "GET",
    headers: {
      token: token,
    },
  });
  const payload: SubjectsData = await res.json();
  const data: Subject[] = payload.subjects;
  return (
    <div className="grid grid-cols-3 gap-3 ">
      {data.map((sub) => {
        return (
          <Link
            href="/exams"
            key={sub._id}
            className=" relative"
          >
            <Image
              src={sub.icon}
              alt={sub.name}
              width={336}
              height={448}
              className="w-full h-full object-cover"
            />
            <h2 className="absolute bottom-3 left-3 right-3 bg-blue-600/50 text-white font-semibold font-(family-name:--font-geist-mono) text-xl px-4 py-5">
              {sub.name}
            </h2>
          </Link>
        );
      })}
    </div>
  );
}
