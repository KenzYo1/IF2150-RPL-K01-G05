"use client";

import { useState, type ReactNode } from "react";

type ReportSectionProps = {
    title: string;
    reports: ReactNode;
    open?: boolean;
};

export function ReportSection({ title, reports, open = false }: ReportSectionProps) {

    const [isOpen, setIsOpen] = useState(open);

    return (
        <section className="mb-8">

            <button onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between border-b border-black px-8 pb-2">
                <h2 className="text-4xl font-hywenhei">
                    {title}
                </h2>

                <div className="mt-2 flex items-center gap-2">
                    <img src="/icon/ChevD.svg" alt="drop" className={`size-6 transition-transform ${isOpen ? "" : "-rotate-90"}`} />
                </div>
            </button>

            {isOpen && <div className="mt-6 flex flex-col gap-4 px-8">{reports}</div>}
        </section>
    );
}
