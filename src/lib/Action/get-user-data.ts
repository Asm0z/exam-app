'use server';

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserData(){
    const cookiesData = cookies()
    const encryptedToken = cookiesData.get('__Secure-next-auth.session-token')?.value
    const data = await decode({token: encryptedToken, secret: process.env.NEXTAUTH_SECRET!})
    return data
}