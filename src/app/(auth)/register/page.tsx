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
import { PhoneInput } from "@/components/ui/phone-input";
import Link from "next/link";
import { registerSchema, RegisterSchemaType } from "@/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CircleX, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/Action/auth.api";

export default function RegisterPage() {
  // Navigation
  const route = useRouter();

  // State
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showRePassword, setShowRePassword] = useState<boolean>(true);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  // Form
  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  // Function
  async function handleRegister(values: RegisterSchemaType) {
    try {
      // State update
      setBtnLoading(true);
      setErrMsg("");

      // API call
      const payload = await registerUser(values);
      if ("code" in payload) {
        throw new Error(payload.message);
      } else {
        route.push("/login");
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
      <h1 className="text-3xl text-gray-800 mb-14 font-bold">Create Account</h1>

      {/* Form */}
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(handleRegister)}
        >
          <div className="grid grid-cols-2 gap-3">
            {/* First name field */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Ahmed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last name field */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Abdullah" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* User name field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="user123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          {/* Phone field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <div className="flex items-center gap-0 w-full">
                  {/* Choose country input */}
                  <PhoneInput defaultCountry="EG" className=" m-0" />

                  {/* Type phone input */}
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="01012345678"
                      {...field}
                      className="w-full border-s-transparent"
                    />
                  </FormControl>
                </div>
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

          {/* Confirm Password filed */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showRePassword ? "password" : "text"}
                      placeholder="********"
                      {...field}
                    />

                    {/* Show-hide password icon */}
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowRePassword(!showRePassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
                    >
                      {showRePassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
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
            Create Account
          </Button>

          {/* Navigation to login page */}
          <p className="text-center font-(family-name:--font-geist-mono) font-medium mt-9">
            Already have an account?{" "}
            <Link href={"/login"} className="text-blue-600 ms-2">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
