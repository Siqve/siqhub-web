import { Card } from "@/containers/Card";
import { ReactNode } from "react";

export type CardSectionProps = {
    title: string;
    children: ReactNode;
};

export const CardListSection = ({ title, children }: CardSectionProps) => {
    return (
        <Card>
            <div className="flex flex-col gap-2 p-3">
                <h2 className="w-fit">{title}</h2>
                <div className="flex flex-wrap gap-3">{children}</div>
            </div>
        </Card>
    );
};
