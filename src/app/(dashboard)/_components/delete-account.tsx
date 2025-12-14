"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeleteAccountAPI } from "@/lib/Action/auth.api";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";

export default function DeleteAccount() {
  // State
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  // Delete account function
  async function handleDeleteAccount() {
    try {
      setBtnLoading(true);
      const payload = await DeleteAccountAPI();
      if ("code" in payload) {
        throw new Error(payload.message);
      } else {
        // Redirect to register page
        window.location.href = "/register";
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setBtnLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="reversedDestructive">Delete My Account</Button>
      </DialogTrigger>
      <DialogContent >
        <DialogHeader className="text-center my-14">
          <div className="w-20 h-20 rounded-full bg-red-100 ring-[1.25rem] ring-red-50 my-8 mx-auto flex justify-center items-center">
            <TriangleAlert strokeWidth={1} className="text-red-600 w-12 h-12" />
          </div>
          <DialogTitle className="text-red-600 font-(family-name:--font-geist-mono) font-medium text-lg mb-14 text-center">
            Are you sure you want to delete your account?
          </DialogTitle>
          <DialogDescription className="text-center">
            This action is permanent and cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-50 py-6 px-14">
          <DialogClose asChild className="mx-auto w-full">
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleDeleteAccount}
            disabled={btnLoading}
            variant="destructive"
            className="w-full"
          >
            Yes, delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
