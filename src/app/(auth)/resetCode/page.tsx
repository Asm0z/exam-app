"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import Link from "next/link";
import CreateYours from "../_components/create-account";
import { CircleX, MoveLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetCodeSchema,
  ResetCodeSchemaType,
} from "@/schema/reset-code.schema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ForgetPasswordResponse, ResetCodeResponse } from "@/lib/types/auth";
import { ForgetPasswordAPI, ResetCodeAPI } from "@/lib/Action/auth.api";
import { toast } from "sonner";

export default function ResetCode() {
  // Navigation
  const router = useRouter();

  // State
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [timer, setTimer] = useState<number>(60);
  const [resendCode, setResendCode] = useState<boolean>(false);
  const [resetEmail, setResetEmail] = useState<string>("");

  const form = useForm<ResetCodeSchemaType>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(ResetCodeSchema),
    mode: "onChange",
  });

  // function for reset code submission
  async function handleResetCode(values: ResetCodeSchemaType) {
    try {
      // State update
      setBtnLoading(true);
      setErrMsg("");

      // API call
      const payload: ApiResponse<ResetCodeResponse> = await ResetCodeAPI(
        values
      );

      // Response check
      if ("code" in payload) {
        throw new Error(payload.message);
      } else {
        router.push("/resetPassword");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrMsg(error.message);
      } else {
        setErrMsg("Something went wrong.");
      }
    } finally {
      setBtnLoading(false);
    }
  }

  // function to resend code
  async function handleResendCode() {
    try {
      const email = localStorage.getItem("resetEmail") || "";
      setTimer(60);
      setResendCode(false);
      const payload: ApiResponse<ForgetPasswordResponse> =
        await ForgetPasswordAPI({ email });
      console.log(payload);
      if ("code" in payload) {
        throw new Error(payload.message);
      } else {
        toast.success("Reset code sent to your email.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Use effect to get email from local storage
  useEffect(() => {
    setResetEmail(localStorage.getItem("resetEmail") || "");
  }, []);

  // Timer effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendCode(true);
    }
  }, [timer]);

  return (
    <div className="flex flex-col justify-center px-36">
      {/* Go to previous page */}
      <Button
        size={"icon"}
        variant="ghost"
        onClick={() => router.back()}
        className="mb-11  bg-gray-100"
      >
        <MoveLeft className="text-gray-900" />
      </Button>

      {/* OTP input */}
      <h1 className="text-3xl text-gray-800 mb-2.5 font-bold">Verify OTP</h1>

      {/* Show user email and edit button */}
      <p className="text-gray-500 font-(family-name:--font-geist-mono) font-medium mt-9 mb-6">
        Please enter the 6-digits code we have sent to:{" "}
        <span className="text-gray-800">{resetEmail}</span>{" "}
        <Link href={"/forgetPassword"} className="text-blue-600 ms-2 underline">
          Edit
        </Link>
      </p>
      <div className="mx-auto my-4">
        {/* Form */}
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleResetCode)}
          >
            {/* OTP filed */}
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <InputOTP
                      {...field}
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Resend code button */}
            {resendCode ? (
              <p className="text-gray-500 text-center font-(family-name:--font-geist-mono) font-medium mb-6">
                {" "}
                Didn`t receive the code?
                <Button variant="link" onClick={handleResendCode}>
                  {" "}
                  Resend
                </Button>
              </p>
            ) : (
              <p className="text-gray-500 text-center font-(family-name:--font-geist-mono) font-medium mb-6">
                You can request another code in: {timer}s
              </p>
            )}

            {/* Error message */}
            {errMsg && (
              <div className="relative">
                <p className="text-red-600 bg-red-50 border border-red-600 font-(family-name:--font-geist-mono) mt-8 mb-4 py-3 text-center">
                  {errMsg}
                </p>
                <CircleX className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-red-600" />
              </div>
            )}

            {/* Submit button */}
            <Button disabled={btnLoading} className="w-full my-6">
              Verify Code
            </Button>

            {/* Go to register page */}
            <CreateYours />
          </form>
        </Form>
      </div>
    </div>
  );
}
