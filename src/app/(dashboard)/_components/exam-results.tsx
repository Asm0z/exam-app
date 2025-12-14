import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Answer, Correct, Question } from "@/lib/types/question";
import { FolderSearch, RotateCcw } from "lucide-react";
import { Pie, PieChart } from "recharts";
import ResultDetails from "./result-details";
import { useState } from "react";
import ExploreResults from "./explore-results";

// Correct answers type
export interface ResultItem {
  question: string;
  answers: Answer[];
  correctAnswer: Correct;
  userAnswer?: Correct;
  isCorrect: boolean;
}

export default function ExamResults({
  examData,
  resetExam,
  userAnswers,
}: {
  examData: Question[];
  resetExam: () => void;
  userAnswers: Record<number, string>;
}) {
  // Use state
  const [showExplore, setShowExplore] = useState(false);

  // Prepare results array
  const examResults: ResultItem[] = examData.map((q, idx) => ({
    question: q.question,
    answers: q.answers,
    correctAnswer: q.correct,
    userAnswer: userAnswers[idx] as Correct | undefined,
    isCorrect: userAnswers[idx] === q.correct,
  }));

  if (showExplore) {
    // Render the new ExploreResults page
    return <ExploreResults results={examResults} />;
  }

  // Calculate correct answers
  const results = examData.map((question, index) => {
    const userAnswer = userAnswers[index];
    const isCorrect = userAnswer === question.correct;

    return {
      question: question.question,
      answers: question.answers,
      correctAnswer: question.correct,
      userAnswer: userAnswer as Correct | undefined,
      isCorrect,
    };
  });

  const correctCount = results.filter((r) => r.isCorrect).length;
  const incorrectCount = examData.length - correctCount;

  // Chart variables
  const chartData = [
    { answers: "correct", results: correctCount, fill: "var(--correct)" },
    { answers: "incorrect", results: incorrectCount, fill: "var(--incorrect)" },
  ];
  const chartConfig = {
    correct: {
      label: "correct",
      color: "var(--correct)",
    },
    incorrect: {
      label: "incorrect",
      color: "var(--incorrect)",
    },
  } satisfies ChartConfig;

  return (
    <>
      <h2 className="font-(family-name:--font-geist-mono) font-semibold text-2xl text-blue-600 mt-6">
        Results
      </h2>
      <div className="grid grid-cols-4 mt-4">
        <div className="col-span-1 flex flex-col justify-center items-center gap-6">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[12.7rem] w-[12.7rem]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="results"
                nameKey="answers"
                innerRadius={60}
                outerRadius={100}
              />
            </PieChart>
          </ChartContainer>
          <div className="font-medium font-(family-name:--font-geist-mono) mt-6">
            <h4>
              <span className="inline-block w-4 h-4 bg-emerald-500 me-2"></span>
              Correct: {correctCount}
            </h4>
            <h4>
              <span className="inline-block w-4 h-4 bg-red-500 me-2"></span>
              InCorrect: {incorrectCount}
            </h4>
          </div>
        </div>
        <div className="col-span-3 max-h-[32.125rem] overflow-y-auto border border-gray-100 p-4">
          <ResultDetails results={results} />
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <Button className="w-full" variant={"secondary"} onClick={resetExam}>
          <RotateCcw /> Restart
        </Button>
        <Button className="w-full" onClick={() => setShowExplore(true)}>
          <FolderSearch /> Explore
        </Button>
      </div>
    </>
  );
}
