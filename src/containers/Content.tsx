import { ReactNode } from "react";

export type ContentProps = {
    children?: ReactNode;
};

export const Content = ({ children }: ContentProps) => {
    return <div className="mx-auto flex w-full max-w-content flex-col">{children}</div>;
};
