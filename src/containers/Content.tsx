import { ReactNode } from "react";

export type ContentProps = {
    children?: ReactNode;
};

export const Content = ({ children }: ContentProps) => {
    return <div className="w-full max-w-content flex mx-auto flex-col">{children}</div>;
};
