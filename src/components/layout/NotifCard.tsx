import * as React from "react"
import { cn } from "cn"

// Setup variables
export interface NotificationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">
{
    title: string
    desc: string
    isRead?: boolean
}

// Declare
function Notification
({
    className,
    title,
    desc,
    isRead = false,
    ...props
}: NotificationProps)
{
    return (
        /* Container */
        <div
            className={cn(
                "flex px-[25px] py-[20px] w-[1070px] min-h-[87px] flex-col gap-[1px] border-[2px] border-[#000000] rounded-[20px]",

                /* If notification is read once, change colour of bg */
                isRead ? "bg-[#898DA4]" : "bg-white",
                className
            )}
            {...props}
        >
            {/* Title */}
            <div className={cn(
                "text-[16px] font-hywenhei whitespace-normal break-words",
                isRead ? "text-[#67697a]" : "text-[#000000]"
            )}>
                {title}
            </div>

            {/* Description */}
            <div className={cn(
                "text-[13px] font-Mermaid] font-bold whitespace-normal break-words",
                isRead ? "text-[#67697a]" : "text-[#757575]"
            )}>
                {desc}
            </div>
        </div>
    )
}

export { Notification }