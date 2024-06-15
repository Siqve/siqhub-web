import clsx from "clsx";

export type SpinnerProps = {
    color?: string;
    size?: "small" | "medium" | "large";
};

export const Spinner = ({ color, size }: SpinnerProps) => {
    const sizeClass = {
        small: "h-10 w-10 border-4",
        medium: "h-16 w-16 border-4",
        large: "h-24 w-24 border-8",
    }[size ?? "medium"];
    return (
        <div
            className={clsx(
                "inline-block animate-[spin_800ms_linear_infinite] self-center rounded-[50%] border-t-[#0000]",
                sizeClass,
            )}
        />
    );
};
