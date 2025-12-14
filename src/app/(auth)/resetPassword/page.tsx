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
import { CircleX, Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import CreateYours from "../_components/create-account";
import {
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/schema/reset-password.schema";
import { ResetPasswordAPI } from "@/lib/Action/auth.api";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  // Navigation
  const router = useRouter();

  // State
  const [showPassword, setShowPassword] = useState(true);
  const [showRePassword, setShowRePassword] = useState(true);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  // Form
  const form = useForm<ResetPasswordSchemaType>({
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  // function
  async function handleResetPassword(values: ResetPasswordSchemaType) {
    try {
      // State update
      setBtnLoading(true);
      setErrMsg("");

      // API call with only email and newPassword
      const { email, newPassword } = values;
      const payload = await ResetPasswordAPI({ email, newPassword });

      // Response check
      if ("code" in payload) {
        throw new Error(payload.message);
      } else {
        // Remove email from local storage
        localStorage.removeItem("resetEmail");

        // Navigate to login page
        router.push("/login");
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

  // Use effect to get email from local storage
  useEffect(() => {
    const email = localStorage.getItem("resetEmail") || "";
    if (email) {
      form.setValue("email", email);
    }
  }, [form]);

  return (
    <div className="flex flex-col justify-center px-36">
      <h1 className="text-3xl text-gray-800 font-bold">
        Create a New Password
      </h1>
      <p className="text-gray-500 font-(family-name:--font-geist-mono) font-medium mb-6">
        Create a new strong password for your account.
      </p>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(handleResetPassword)}
        >
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "password" : "text"}
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showRePassword ? "password" : "text"}
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowRePassword(!showRePassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
                  >
                    {showRePassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {errMsg && (
            <div className="relative">
              <p className="text-red-600 bg-red-50 border border-red-600 font-(family-name:--font-geist-mono) mt-8 mb-4 py-3 text-center">
                {errMsg}
              </p>
              <CircleX className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-red-600" />
            </div>
          )}
          <Button disabled={btnLoading} className="w-full">
            Reset Password
          </Button>
          <CreateYours />
        </form>
      </Form>
    </div>
  );
}
