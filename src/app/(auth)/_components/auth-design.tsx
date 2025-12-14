import Image from "next/image";
import { BookOpenCheck, Brain, RectangleEllipsis } from "lucide-react";
import examIcon from "@/public/folder-code.png";

export default function AuthDesign() {
  return (
    <div className="relative flex justify-center items-center overflow-hidden px-36 py-32">
      {/* Background Color */}
      <div className="w-[25.125rem] h-[25.125rem] rounded-full bg-blue-400 absolute top-28 -right-8 blur-3xl"></div>
      <div className="w-[25.125rem] h-[25.125rem] rounded-full bg-blue-400 absolute -bottom-12 left-0 blur-3xl"></div>

      <div className="z-10">
        {/* Header */}
        <div className="flex items-center">
          <Image src={examIcon} alt="Exam-icon" className="mx-2 my-3 w-10 h-10" />
          <h1 className="text-blue-600 font-semibold text-xl font-(family-name:--font-geist-mono)">
            Exam App
          </h1>
        </div>

        {/* Title */}
        <h2 className="text-3xl text-gray-800 mb-14 mt-36 font-bold">
          Empower your learning journey with our smart exam platform.
        </h2>

        {/* Content part 1 */}
        <div className="flex mb-9">
          <div className="border-2 border-blue-500 me-5 flex justify-center items-center w-10 h-10 px-2 ">
            <Brain className=" text-blue-600" />
          </div>
          <div>
            <h3 className="text-blue-600 font-semibold text-xl font-(family-name:--font-geist-mono)">
              Tailored Diplomas
            </h3>
            <p className="text-gray-700 font-(family-name:--font-geist-mono)">
              Choose from specialized tracks like Frontend, Backend, and Mobile
              Development.
            </p>
          </div>
        </div>

        {/* Content part 2 */}
        <div className="flex mb-9">
          <div className="border-2 border-blue-500 me-5 flex justify-center items-center w-10 h-10 px-2">
            <BookOpenCheck className=" text-blue-600" />
          </div>
          <div>
            <h3 className="text-blue-600 font-semibold text-xl font-(family-name:--font-geist-mono)">
              Focused Exams
            </h3>
            <p className="text-gray-700 font-(family-name:--font-geist-mono)">
              Access topic-specific tests including HTML, CSS, JavaScript, and
              more.
            </p>
          </div>
        </div>

        {/* Content part 3 */}
        <div className="flex mb-9">
          <div className="border-2 border-blue-500 me-5 flex justify-center items-center w-10 h-10 px-2">
            <RectangleEllipsis className=" text-blue-600" />
          </div>
          <div>
            <h3 className="text-blue-600 font-semibold text-xl font-(family-name:--font-geist-mono)">
              Smart Multi-Step Forms
            </h3>
            <p className="text-gray-700 font-(family-name:--font-geist-mono)">
              Choose from specialized tracks like Frontend, Backend, and Mobile
              Development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
