"use server";
import { RegisterSchemaType } from "@/schema/register.schema";
import {
  ChangePasswordResponse,
  ForgetPasswordResponse,
  RegisterResponse,
  ResetCodeResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  UserDataResponse,
} from "../types/auth";
import { ForgetPasswordSchemaType } from "@/schema/forget-password.schema";
import { ResetCodeSchemaType } from "@/schema/reset-code.schema";
import { getUserData } from "./get-user-data";
import { EditProfileSchemaSchemaType } from "@/schema/edit-profile.schema";
import { ChangePasswordSchemaType } from "@/schema/change-password.schema";

// Get user token from cookies
async function getUserToken() {
  const userData = await getUserData();
  const token = userData?.accessToken;
  return token;
}

// Register Api
export async function registerUser(values: RegisterSchemaType) {
  const res = await fetch(`${process.env.URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload: ApiResponse<RegisterResponse> = await res.json();
  return payload;
}

// Forget Password Api
export async function ForgetPasswordAPI(values: ForgetPasswordSchemaType) {
  const res = await fetch(`${process.env.URL}/auth/forgotPassword`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload: ApiResponse<ForgetPasswordResponse> = await res.json();
  return payload;
}

// Reset Code Api
export async function ResetCodeAPI(values: ResetCodeSchemaType) {
  const res = await fetch(`${process.env.URL}/auth/verifyResetCode`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload: ApiResponse<ResetCodeResponse> = await res.json();
  return payload;
}

// Reset Password Api
export async function ResetPasswordAPI(values: ResetPasswordPayload) {
  const res = await fetch(`${process.env.URL}/auth/resetPassword`, {
    method: "PUT",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload: ApiResponse<ResetPasswordResponse> = await res.json();
  return payload;
}

// Edit profile Api
export async function EditProfile(values: EditProfileSchemaSchemaType) {
  const res = await fetch(`${process.env.URL}/auth/editProfile`, {
    method: "PUT",
    body: JSON.stringify(values),
    headers: {
      token: (await getUserToken()) || "",
      "Content-Type": "application/json",
    },
  });
  const payload: ApiResponse<RegisterResponse> = await res.json();
  return payload;
}

// Delete account Api
export async function DeleteAccountAPI() {
  const res = await fetch(`${process.env.URL}/auth/deleteMe`, {
    method: "DELETE",
    headers: {
      token: (await getUserToken()) || "",
    },
  });
  const payload: ApiResponse<RegisterResponse> = await res.json();
  return payload;
}

// Change password Api
export async function ChangePasswordAPI(values: ChangePasswordSchemaType) {
  const res = await fetch(`${process.env.URL}/auth/changePassword`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      token: (await getUserToken()) || "",
      "Content-Type": "application/json",
    },
  });
  const payload: ApiResponse<ChangePasswordResponse> = await res.json();
  return payload;
}

// Get user data Api
export async function GetUserInfo() {
  const res = await fetch(`${process.env.URL}/auth/profileData`, {
    method: "GET",
    headers: {
      token: (await getUserToken()) || "",
    },
  });
  const payload: ApiResponse<UserDataResponse> = await res.json();
  return payload ;
}
