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
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/schema/login.schema";
import { CircleX, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import CreateYours from "../_components/create-account";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  // State
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>("");
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  // Form
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  // function
  async function handleLogin(values: LoginSchemaType) {
    // State update
    setBtnLoading(true);
    setErrMsg("");

    // Sign in response
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    // Reset button loading state
    setBtnLoading(false);

    // Response check
    if (!response?.ok) {
      setErrMsg(response?.error || "An Error occurred");
      return;
    } else {
      window.location.href = "/";
    }
  }
  return (
    <div className="flex flex-col justify-center px-36">
      <h1 className="text-3xl text-gray-800 mb-14 font-bold">Login</h1>

      {/* Form */}
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleLogin)}>
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

          {/* Password filed */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "password" : "text"}
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>

                  {/* Show-hide password icon */}
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

          {/* Forget password navigation */}
          <Link
            href={"/forgetPassword"}
            className="text-blue-600 mt-2.5 mb-4 block w-full text-end"
          >
            Forgot your password?
          </Link>

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
            Login
          </Button>

          {/* Go to register page */}
          <CreateYours />
        </form>
      </Form>
    </div>
  );
}
