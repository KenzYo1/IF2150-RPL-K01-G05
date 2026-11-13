import * as React from "react";
import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface LeaderboardItemProps extends React.HTMLAttributes<HTMLDivElement>
{
    rank: number;
    avatarUrl?: string;
    name: string;
    points: number;
}

export function LeaderboardItem
({
    rank,
    avatarUrl,
    name,
    points,
    className,
    ...props
}: LeaderboardItemProps)
{
    return (
        // Container
        <div className={cn(
            "flex px-[25px] py-[12px] w-[1070px] min-h-[30px] items-center border-[2px] border-[#000000] rounded-[20px] bg-white",
            className
        )}
        {...props}>
            {/* Inside the container */ }
            <div className="flex items-center gap-4">
                {/* Tier/Rank */ }
                <span className="w-8 text-left text-[#000000] text-[16px] font-hywenhei">
                    {rank}
                </span>

                {/* PFP */ }
                <Avatar className="size-[50px]">
                    <AvatarImage src={avatarUrl} alt={name} />
                    <AvatarFallback className="bg-black text-white"></AvatarFallback>
                </Avatar>

                {/* Name */ }
                <span className="text-[#000000] text-[16px] font-hywenhei tracking-wide">
                    {name}
                </span>
            </div>

            {/* Points */ }
            <span className="ml-auto text-[#000000] text-[16px] font-hywenhei">
                {points}
            </span>
        </div>
    );
}