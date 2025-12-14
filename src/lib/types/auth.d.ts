import { User } from "next-auth"

export type RegisterResponse = {
    token: string,
    user: User["user"],
}

export type ForgetPasswordResponse = {
    info: string,
}

export type ResetCodeResponse = {
    status: string;
}

export type ResetPasswordResponse = {
    token: string,
}

// function to not sent confirm password field
export type ResetPasswordPayload = {
    email: string,
    newPassword: string,
}

export type ChangePasswordResponse = {
    token: string,
}

export type UserDataResponse = {
    user: User["user"],
}