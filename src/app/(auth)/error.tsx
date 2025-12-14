"use client";
import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h2 className="text-2xl my-2">An error occurred, please try again</h2>
      <p className="text-xl text-red-500">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
