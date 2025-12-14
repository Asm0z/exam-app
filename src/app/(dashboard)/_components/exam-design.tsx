"use client";
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question } from "@/lib/types/question";
import { ChevronLeft, ChevronRight, SquareCheckBig } from "lucide-react";
import { useEffect, useState } from "react";
import ExamResults from "./exam-results";

export default function ExamDesign({ examData }: { examData: Question[] }) {
  // Use state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Record<number, string>>(
    {}
  );
  const [isFinished, setIsFinished] = useState(false);

  //   Timer logic
  const question = examData[currentIndex];
  const totalTime = question.exam.duration * 60;
  const [timeLeft, setTimeLeft] = useState<number>(totalTime);
  const progressValue =
    totalTime > 0 ? Math.round((timeLeft / totalTime) * 100) : 0;

  // Save answers function
  function handleSelectedAnswer(value: string) {
    setSelectedAnswer((prev) => ({ ...prev, [currentIndex]: value }));
  }

  //   Buttons logic
  function next() {
    if (currentIndex < examData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }
  function preview() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  // End exam
  function endExam() {
    setIsFinished(true);
    localStorage.removeItem("examEndTime");
  }

  // Reset Exam
  const resetExam = () => {
    localStorage.removeItem("examEndTime");
    setCurrentIndex(0);
    setSelectedAnswer({});
    setTimeLeft(totalTime);
    setIsFinished(false);
  };

  // useEffect for timer
  useEffect(() => {
    if (isFinished) return;

    const storedEndTime = localStorage.getItem("examEndTime");
    let endTime: number;

    if (storedEndTime) {
      endTime = parseInt(storedEndTime);
    } else {
      endTime = Date.now() + totalTime * 1000;
      localStorage.setItem("examEndTime", endTime.toString());
    }

    const interval = setInterval(() => {
      const remainingTime = Math.max(
        0,
        Math.floor((endTime - Date.now()) / 1000)
      );

      setTimeLeft(remainingTime);

      if (remainingTime === 0) {
        setIsFinished(true);
        localStorage.removeItem("examEndTime");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [totalTime, isFinished]);

  return (
    <div className="font-(family-name:--font-geist-mono) p-6 bg-white">
      <div className="flex justify-between items-center text-gray-500">
        <h1>Frontend Development - {question.exam.title}</h1>
        <h3>
          Question{" "}
          <span className="text-blue-600 font-bold">{currentIndex + 1}</span> of{" "}
          {examData.length}
        </h3>
      </div>
      <Progress value={((currentIndex + 1) / examData.length) * 100} />
      {isFinished ? (
        <ExamResults
          examData={examData}
          resetExam={resetExam}
          userAnswers={selectedAnswer}
        />
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-blue-600 mt-10 mb-4">
            {question.question}
          </h2>
          <RadioGroup
            value={selectedAnswer[currentIndex] || ""}
            onValueChange={handleSelectedAnswer}
            className="space-y-2"
          >
            {question.answers.map((answer) => (
              <Label
                key={answer.key}
                htmlFor={answer.key}
                className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 px-3 py-4 cursor-pointer"
              >
                <RadioGroupItem value={answer.key} id={answer.key} />
                <span>{answer.answer}</span>
              </Label>
            ))}
          </RadioGroup>
          <div className="flex items-center mt-8">
            <Button
              disabled={currentIndex === 0}
              onClick={preview}
              className="w-full"
            >
              <ChevronLeft />
              Previous
            </Button>
            <div className="mx-4">
              <AnimatedCircularProgressBar
                value={progressValue}
                primaryColorHex="var(--mainColor)"
                secondaryColorHex="var(--secondColor)"
                renderLabel={() => {
                  const min = Math.floor(timeLeft / 60);
                  const sec = timeLeft % 60;
                  return `${min}:${sec.toString().padStart(2, "0")}`;
                }}
                className="w-20 h-20"
              />
            </div>
            {currentIndex === examData.length - 1 ? (
              <Button
                className="w-full"
                variant={"destructive"}
                onClick={endExam}
              >
                End Exam
                <SquareCheckBig />
              </Button>
            ) : (
              <Button onClick={next} className="w-full">
                Next
                <ChevronRight />
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
