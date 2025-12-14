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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { EditProfile } from "@/lib/Action/auth.api";
import { CircleX } from "lucide-react";
import {
  editProfileSchema,
  EditProfileSchemaSchemaType,
} from "@/schema/edit-profile.schema";
import DeleteAccount from "../../_components/delete-account";
import { toast } from "sonner";
import { GetUserInfo } from "../../../../lib/Action/auth.api";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  // Navigation
  const router = useRouter();

  // State
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  // Form
  const form = useForm<EditProfileSchemaSchemaType>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(editProfileSchema),
    mode: "onChange",
  });

  // Function
  async function handleEditProfile(values: EditProfileSchemaSchemaType) {
    try {
      // State update
      setBtnLoading(true);
      setErrMsg("");

      // API call
      const payload = await EditProfile(values);
      if ("code" in payload) {
        setErrMsg(payload.message);
      } else {
        // Toast
        toast.success("Your account data has been updated.", {
          position: "bottom-right",
        });

        // refresh to update user info
        router.refresh();
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

  //Use effect to get user data from cookies
  useEffect(() => {
    async function handleUserData() {
      try {
        // API call
        const payload = await GetUserInfo();

        if ("code" in payload) {
          throw new Error(payload.message);
        } else {
          // User Data
          const user = payload.user;
          form.reset({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
    handleUserData();
  }, [form]);

  return (
    <div className="flex flex-col ms-6 p-6 h-full bg-white">
      {/* Form */}
      <Form {...form}>
        <form className="space-y-4">
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
          <div className="grid grid-cols-2 gap-3">
            <DeleteAccount />
            <Button
              disabled={btnLoading}
              onClick={form.handleSubmit(handleEditProfile)}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
