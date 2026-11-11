"use client"

import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { sendOtp, verifyOtp } from "./actions"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

const OTPField = ({ onSend }: { onSend: () => void }) => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center px-30">
            <div className="flex gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <input onChange={(e) => e.target.value && (e.target.nextElementSibling as HTMLInputElement | null)?.focus()} key={i} name="otp" type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={1} className="border border-black rounded-xl w-15 h-15 font-hywenhei text-2xl text-center font-extralight"/>                    
                ))}
            </div>
            <Button type="button" variant="ghost" onClick={onSend} size="auto" className="h-8 w-16 text-[12px] self-end font-hywenhei">Send OTP</Button>
        </div>
    )
}

const ForgotPasswordForm = () => {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState(searchParams.get("email") ?? "");
    const [message, setMessage] = useState("");

    const handleSend = async () => {
        const error = await sendOtp(email);
        setMessage(error ?? "OTP telah dikirim ke email.");
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = new FormData(e.currentTarget).getAll("otp").join("");
        const error = await verifyOtp(email, token);
        setMessage(error ?? "Berhasil.");
    }
    return (
        <div className="w-full min-h-dvh flex justify-center items-center">
            <form onSubmit={handleSubmit} className="flex flex-col w-[60vw] h-[30vw] border-2 border-black rounded-2xl">
                <div className="flex flex-col gap-10 p-10">
                    <h1 className="flex items-center justify-center text-2xl font-hywenhei">Forgot Password</h1>
                    <p className="flex items-center justify-center font-hywenhei text-red-500">{message}</p>
                    <OTPField onSend={handleSend}/>
                </div>
                <Button variant="rounded" size="auto" className="flex self-center justify-center" type="submit">Submit OTP</Button>
            </form>
        </div>
    )
}

const ForgotPasswordPage = () => {
    return (
        <Suspense>
            <ForgotPasswordForm/>
        </Suspense>
    )
}

export default ForgotPasswordPage;