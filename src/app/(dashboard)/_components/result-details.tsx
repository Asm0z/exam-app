import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ResultItem } from "./exam-results";

export default function ResultDetails({ results }: { results: ResultItem[] }) {
  return (
    <>
      {results.map((result, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">
            {index + 1}. {result.question}
          </h2>

          <RadioGroup value={result.userAnswer} className="space-y-2">
            {result.answers.map((answer) => {
              const isCorrect = answer.key === result.correctAnswer;
              const isUserChoice = answer.key === result.userAnswer;

              return (
                <Label
                  key={answer.key}
                  className={`flex items-center space-x-2 px-3 py-3 rounded
                             ${isCorrect ? "bg-emerald-100" : ""}
                             ${
                               isUserChoice && !isCorrect ? "bg-red-100" : ""
                             } `}
                >
                  <RadioGroupItem value={answer.key} disabled />
                  <span>{answer.answer}</span>
                </Label>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </>
  );
}
