import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Role } from "@/types/role";

// Define
interface AccountCardProp
{
    role: Role;
}

// Role for status account
const ROLE_LABELS: Record<Role, string> = 
{
    pelapor: "Mahasiswa",
    petugas: "Petugas",
    admin: "Admin",
};

export function AccountCard({ role }: AccountCardProp)
{
    return (
        // Container
        <div className="flex px-[83px] py-[36px] w-[1053px] min-h-[450px] flex-col gap-[35px] bg-white border-[1px] border-[#C9C8C8] rounded-3xl">

            {/* Top part */}
            <div className="flex items-center gap-[28px]">
                {/* PFP */}
                <Avatar className="size-[126px]">
                    <AvatarImage src="" alt="Profile" />
                    <AvatarFallback className="bg-black text-white"></AvatarFallback>
                </Avatar>

                {/* Name + email */}
                <div className="flex flex-col">
                    <h2 className="text-[42px] font-hywenhei tracking-wide">Name</h2>
                    <p className="text-[24px] font-hywenhei tracking-wide">
                    13526767@mahasiswa.itb.ac.id
                    </p>
                </div>
            </div>
            
            {/* Account status */}
            <div className="flex flex-col">
                <span className="text-[27px] font-hywenhei">Account Status</span>
                <span className="text-[24px] font-hywenhei"> 
                    {ROLE_LABELS[role]}
                </span>
            </div>

            {/* Total points */}
            <div className="flex flex-col">
                <span className="text-[27px] font-hywenhei">Total Points</span>
                <span className="text-[24px] font-hywenhei">888888</span>
            </div>

            {/* Log out */}
            <button className="flex items-center gap-[20px] text-[28px] font-hywenhei">
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
