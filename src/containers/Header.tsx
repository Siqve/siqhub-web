import { Content } from "@/containers/Content";
import { ReactNode } from "react";

export type HomeHeaderProps = {
    children?: ReactNode;
};

export const Header = ({ children }: HomeHeaderProps) => {
    return (
        <div className="p-6 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.5)]">
            <Content>{children}</Content>
        </div>
    );
};
