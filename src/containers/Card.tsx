import { ReactNode } from "react";

export type CardProps = {
    children: ReactNode;
};

export const Card = ({ children }: CardProps) => {
    return (
        <div className="rounded-2xl shadow-[0_0_6px_1px_rgba(0,0,0,0.5)]">
            {children}
        </div>
    );
};
