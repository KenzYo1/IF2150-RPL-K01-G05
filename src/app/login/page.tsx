import { Button } from "@/components/ui/button"
import { Input } from "@base-ui/react"

const InputField = ({type, title, name, placeholder}: {type: string, name: string, title: string, placeholder: string}) => {
    return (
        <div className="flex flex-col w-full gap-[6px]">
            <span className="font-hywenhei text-[18px] text-[#5D6494]">{title}</span>
            <Input type={type} name={name} placeholder={placeholder} className="border-2 border-[#5D6494] rounded-[10px] p-4 font-hywenhei text-[14px] w-full placeholder:text-[#A8BCF7] h-11"/>
        </div>
    )
}

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center gap-[147px] min-h-[40vw] p-10">
            <img
                src="/Logo.png"
                alt=""
                width={200}
                height={200}
            />
            <form className="flex flex-col items-center rounded-[25px] border-2 border-black w-[40vw] h-full p-[47px] gap-6 py-30">
                <h1 className="font-hywenhei text-[28px] font-black text-center font-light">Welcome!</h1>
                <div className="flex flex-col w-full items-center justify-center gap-2">
                    <Button variant="rounded" size="auto" className="text-[16px] w-full h-10">Sign in with ITB Account</Button>
                    <p className="font-hywenhei text-[14px] font-black">or</p>
                    <InputField type="email" name="email" title="Email" placeholder="Input email here" />
                    <InputField type="password" name="password" title="Password" placeholder="Input password here"/>
                    <Button variant="ghost" size="auto" className="self-end justify-end font-hywenhei text-[10px] text-[#A8BCF7]">Forgot Password?</Button>
                    <Button variant="normal" size="auto" className="text-[16px] h-10 rounded-[16px]">Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;