import { Button } from "@/components/ui/button"
import { Input } from "@base-ui/react"

const OTPField = () => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center px-30">
            <div className="flex gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <input key={i} name="otp" type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={1} className="border border-black rounded-xl w-15 h-15 font-hywenhei text-2xl text-center font-extralight"/>                    
                ))}
            </div>
            <Button variant="ghost" size="auto" className="h-8 w-16 text-[12px] self-end font-hywenhei">Send OTP</Button>
        </div>
    )
}

const ForgotPasswordPage = () => {
    return (
        <div className="w-full min-h-dvh flex justify-center items-center">
            <form className="flex flex-col w-[60vw] h-[30vw] border-2 border-black rounded-2xl">
                <div className="flex flex-col gap-10 p-10">
                    <h1 className="flex items-center justify-center text-2xl font-hywenhei">Forgot Password</h1>
                    <p>{}</p>
                    <OTPField/>
                </div>
                <Button variant="rounded" size="auto" className="flex self-center justify-center">Submit OTP</Button>
            </form>
        </div>
    )
}

export default ForgotPasswordPage;