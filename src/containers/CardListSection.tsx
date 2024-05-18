import { ReactNode } from "react";
import { Card } from "@/containers/Card";

export type CardSectionProps = {
    title: string;
    children: ReactNode;
};

export const CardListSection = ({ title, children }: CardSectionProps) => {
    return (
        <Card>
            <div className="p-3 flex flex-col gap-2">
                <h2 className="w-fit">{title}</h2>
                <div className="flex gap-3 flex-wrap">{children}</div>
            </div>
        </Card>
    );
};
