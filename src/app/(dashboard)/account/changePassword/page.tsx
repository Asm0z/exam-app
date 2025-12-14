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
import { useState } from "react";
import { CircleX, Eye, EyeOff } from "lucide-react";
import { ChangePasswordAPI } from "@/lib/Action/auth.api";
import {
  changePasswordSchema,
  ChangePasswordSchemaType,
} from "@/schema/change-password.schema";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export default function ChangePasswordPagePage() {
  // State
  const [showOldPassword, setShowOldPassword] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showRePassword, setShowRePassword] = useState<boolean>(true);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  // Form
  const form = useForm<ChangePasswordSchemaType>({
    defaultValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  // Function
  async function handleChangePassword(values: ChangePasswordSchemaType) {
    try {
      // State update
      setBtnLoading(true);
      setErrMsg("");

      // API call
      const payload = await ChangePasswordAPI(values);
      if ("code" in payload) {
        setErrMsg(payload.message);
      } else {
        //  Success toast
        toast.success("Your password has been updated.", {
          position: "bottom-right",
        });

        // Sign out to clear old cookies
        signOut({
          callbackUrl: "/login",
        });
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
    <div className="flex flex-col ms-6 p-6 h-full bg-white">
      {/* Form */}
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(handleChangePassword)}
        >
          {/* Old password filed */}
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem className="pb-6 border-b border-gray-100">
                <FormLabel>Old Password</FormLabel>
                <div className="relative mb-6">
                  <FormControl>
                    <Input
                      type={showOldPassword ? "password" : "text"}
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>

                  {/* Show-hide password icon */}
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
                  >
                    {showOldPassword ? <EyeOff /> : <Eye />}
                  </Button>
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
            Update Password
          </Button>
        </form>
      </Form>
    </div>
  );
}
