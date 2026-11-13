import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Role } from "@/types/role";

// Define
interface AccountCardProp
{
    role: Role;
    name: string;
    email: string;
    points: Number;  
}

// Role for status account
const ROLE_LABELS: Record<Role, string> = 
{
    pelapor: "Mahasiswa",
    petugas: "Petugas",
    admin: "Admin",
};

export function AccountCard({ role, name, email, points }: AccountCardProp)
{
    return (
        // Container
        <div className="flex px-[83px] py-[36px] w-[1053px] min-h-[200px] flex-col gap-[27px] bg-white border-[1px] border-[#C9C8C8] rounded-3xl">

            {/* Top part */}
            <div className="flex items-center gap-[28px]">
                {/* PFP */}
                <Avatar className="size-[100px]">
                    <AvatarImage src="" alt="Profile" />
                    <AvatarFallback className="bg-black text-white"></AvatarFallback>
                </Avatar>

                {/* Name + email */}
                <div className="flex flex-col">
                    <h2 className="text-[25px] font-hywenhei tracking-wide">{name}</h2>
                    <p className="text-[16px] font-hywenhei tracking-wide">
                    {email}
                    </p>
                </div>
            </div>
            
            {/* Account status */}
            <div className="flex flex-col">
                <span className="text-[16px] font-hywenhei">Account Status</span>
                <span className="text-[13px] font-hywenhei"> 
                    {ROLE_LABELS[role]}
                </span>
            </div>

            {/* Total points */}
            <div className="flex flex-col">
                <span className="text-[16px] font-hywenhei">Total Points</span>
                <span className="text-[13px] font-hywenhei">{String(points)}</span>
            </div>

            {/* Log out */}
            <button className="flex items-center gap-[20px] text-[20px] font-hywenhei">
                <img 
                    src ="/logout.svg"
                    alt="Log Out"
                    className="size-6 object-contain"
                />
                Log Out
            </button>
        </div>
    );
}
