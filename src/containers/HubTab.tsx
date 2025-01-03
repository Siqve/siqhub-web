"use client";
import clsx from "clsx";
import { Children, ReactNode, useState } from "react";

export type HueTabProps = {
    tabNames: string[];
    startTabIndex?: number;
    children: ReactNode;
};

export const HubTab = ({ tabNames, startTabIndex, children }: HueTabProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(startTabIndex ?? 0);
    if (tabNames.length === 0) return null;
    const childrenArray = Children.toArray(children);

    return (
        <div className="flex w-full flex-col text-center">
            <div className="flex justify-center gap-5 pb-5">
                {tabNames.map((tabName, index) => (
                    <button
                        key={tabName}
                        className={clsx(
                            "text-3xl",
                            activeTabIndex === index
                                ? "border-b border-b-text-main text-base-content"
                                : "text-gray-950",
                        )}
                        onClick={() => {
                            setActiveTabIndex(index);
                        }}
                    >
                        {tabName}
                    </button>
                ))}
            </div>
            {childrenArray.map((child, index) => (
                <div key={index} className={activeTabIndex === index ? "" : "hidden"}>
                    {child}
                </div>
            ))}
        </div>
    );
};
