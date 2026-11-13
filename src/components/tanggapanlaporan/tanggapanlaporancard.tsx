type CompletedStatus = "ACCEPTED" | "REJECTED";

type ReportedRowProps = {
    title: string;
    actionLabel: string;
    onAction: () => void;
    status?: CompletedStatus;
};

export function ReportRow({ title, actionLabel, onAction, status }: ReportedRowProps) {
    return (
        <div className="flex items-center justify-between rounded-2xl border-[1.5px] border-black px-8 py-2">
            <span className="text-[16px] font-hywenhei">
                {title}

                {status && (
                    <span className={`ml-2 font-hywenhei ${status === "ACCEPTED" ? "text-black-700" : "text-black-700"}`}>
                        [{status}]
                    </span>
                )}
            </span>

            <button onClick={onAction} className="text-[16px] font-hywenhei text-[#5D6494] hover:underline">
                {actionLabel}
            </button>
        </div>
    );
}
