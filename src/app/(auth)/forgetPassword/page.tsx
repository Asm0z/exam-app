"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgetPasswordSchema,
  ForgetPasswordSchemaType,
} from "@/schema/forget-password.schema";
import { CircleX, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateYours from "../_components/create-account";
import { ForgetPasswordAPI } from "@/lib/Action/auth.api";
import { ForgetPasswordResponse } from "@/lib/types/auth";
import React from "react";
import { toast } from "sonner";

export default function ForgetPasswordPage() {
  // Navigation
  const route = useRouter();

  // State
  const [btnLoading, setBtnLoading] = React.useState<boolean>(false);
  const [errMsg, setErrMsg] = React.useState<string>("");
  const [defaultEmail, setDefaultEmail] = React.useState<string>("");

  // Use effect to save user email in local storage
  React.useEffect(() => {
    const email = localStorage.getItem("resetEmail") || "";
    setDefaultEmail(email);
  }, []);
  // Form
  const form = useForm<ForgetPasswordSchemaType>({
    defaultValues: {
      email: defaultEmail,
    },
    resolver: zodResolver(forgetPasswordSchema),
    mode: "onChange",
  });

  // function
  async function handleForgetPassword(values: ForgetPasswordSchemaType) {
    try {
      // State update
      setBtnLoading(true);
      setErrMsg("");

      // API call
      const payload: ApiResponse<ForgetPasswordResponse> =
        await ForgetPasswordAPI(values);

      // Response check
      if ("code" in payload) {
        throw new Error(payload.message);
      } else {
        // Toast success message
        toast.success("Reset code sent to your email.");

        // Save email to local storage
        localStorage.setItem("resetEmail", values.email);

        // Navigate to reset code page
        route.push("/resetCode");
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
  return (
    <div className="flex flex-col justify-center px-36">
      {/* Header */}
      <h1 className="text-3xl text-gray-800 mb-2.5 font-bold">
        Forget Password
      </h1>
      <p className="mb-6 text-gray-500 font-(family-name:--font-geist-mono)">
        Don`t worry, we will help you recover your account.
      </p>

      {/* Form */}
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(handleForgetPassword)}
        >
          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="user@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
          <Button disabled={btnLoading} className="w-full">
            Continue <MoveRight className="ms-2" />
          </Button>

          {/* Go to register page */}
          <CreateYours />
        </form>
      </Form>
    </div>
  );
}
