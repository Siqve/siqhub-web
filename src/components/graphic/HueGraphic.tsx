import * as React from "react";
import { DeviceType } from "@/types/DeviceType";
import { ReactNode } from "react";

export type GraphicProps = {
    fillColorClass?: string;
    height?: string;
};

const GRAPHIC_MAPPING: Record<DeviceType, ({ fillColorClass }: GraphicProps) => ReactNode> = {
    [DeviceType.LED_STRIP]: LedStrip,
    [DeviceType.LAMP]: Lamp,
} as const;

export type HueGraphicProps = {
    graphicType: keyof typeof GRAPHIC_MAPPING;
    fillColorClass: string;
    height?: string;
};

export const HueGraphic = ({ graphicType, fillColorClass, height }: HueGraphicProps) => {
    if (!(graphicType in GRAPHIC_MAPPING)) {
        return null;
    }
    return GRAPHIC_MAPPING[graphicType]({ fillColorClass, height });
};

function LedStrip({ fillColorClass, height }: GraphicProps): ReactNode {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="99 11 314 491" height={height ?? "5em"}>
            <path
                className={fillColorClass}
                d="M325.354 57.499a11.868 11.868 0 1 0 16.067 4.856 11.868 11.868 0 0 0-16.067-4.856ZM239.172 103.672a11.869 11.869 0 1 0 16.067 4.857 11.868 11.868 0 0 0-16.067-4.857ZM152.99 149.846a11.869 11.869 0 1 0 16.067 4.857 11.869 11.869 0 0 0-16.066-4.857ZM336.564 226.3a11.868 11.868 0 1 0-16.066-4.856 11.868 11.868 0 0 0 16.066 4.857ZM250.382 272.475a11.869 11.869 0 1 0-16.066-4.857 11.869 11.869 0 0 0 16.066 4.857ZM164.2 318.648a11.869 11.869 0 1 0-16.066-4.856 11.868 11.868 0 0 0 16.066 4.856ZM272.828 408.328a11.869 11.869 0 1 0-16.067-4.857 11.868 11.868 0 0 0 16.067 4.857ZM359.01 362.154a11.869 11.869 0 1 0-16.067-4.857 11.869 11.869 0 0 0 16.067 4.857ZM186.646 454.501a11.868 11.868 0 1 0-16.067-4.856 11.868 11.868 0 0 0 16.067 4.856ZM272.35 177.123h32.52a3.5 3.5 0 0 0 0-7h-32.52a3.5 3.5 0 0 0 0 7ZM203.63 190.498a3.5 3.5 0 0 0 3.5 3.5h32.52a3.5 3.5 0 0 0 0-7h-32.52a3.5 3.5 0 0 0-3.5 3.5Z"
            />
            <path
                className={fillColorClass}
                d="m411.286 38.037-10.918-20.379a9.773 9.773 0 0 0-13.23-3.998l-16.72 8.958a8.908 8.908 0 0 0-10.21-1.259L121.253 149.384a3.5 3.5 0 0 0-1.847 3.085v53.92a3.5 3.5 0 0 0 3.5 3.5h161.429l-163.082 87.374a3.5 3.5 0 0 0-1.847 3.085v53.92a3.5 3.5 0 0 0 3.5 3.5h161.43l-158.295 84.81a8.91 8.91 0 0 0-4.609 9.196l-16.72 8.958a9.773 9.773 0 0 0-3.998 13.23l10.918 20.38a9.712 9.712 0 0 0 5.787 4.74 9.707 9.707 0 0 0 7.443-.742l16.72-8.958a8.894 8.894 0 0 0 10.21 1.259l238.955-128.025a3.5 3.5 0 0 0 1.847-3.085v-53.92a3.49 3.49 0 0 0-3.501-3.495v-.005H227.666l163.082-87.374a3.5 3.5 0 0 0 1.847-3.085v-53.92a3.49 3.49 0 0 0-3.5-3.495v-.005h-161.43l158.295-84.81a8.908 8.908 0 0 0 4.61-9.196l16.718-8.958a9.773 9.773 0 0 0 4-13.23Zm-288.984 427.62a19.29 19.29 0 0 0-10.165 14.804l-5.253-9.805a2.773 2.773 0 0 1 1.135-3.754l16.256-8.71 3.516 6.564a8.771 8.771 0 0 0-5.49.9Zm263.292-108.221L148.485 484.47a1.93 1.93 0 0 1-2.613-.791l-17.316-32.32a1.93 1.93 0 0 1 .79-2.613l256.248-137.29ZM375.15 309.11l-77.75 41.657H136.85l77.75-41.657Zm10.444-99.554L126.406 348.422v-45.979l259.188-138.865Zm-10.444-48.325L297.4 202.89H136.85l77.75-41.657Zm8.44-99.123a1.917 1.917 0 0 1-.936 1.144l-256.248 137.29v-45.979L363.515 27.53a1.93 1.93 0 0 1 2.613.791l17.316 32.32a1.915 1.915 0 0 1 .146 1.47Zm6.209-34.7a18.158 18.158 0 0 0-9.059 13.36l-6.552-12.23 16.256-8.709a2.774 2.774 0 0 1 3.754 1.135l2.89 5.395a10.14 10.14 0 0 0-7.29 1.05Z"
            />
            <path
                className={fillColorClass}
                d="m301.02 80.03-29.61 15.865a3.5 3.5 0 1 0 3.306 6.17l29.61-15.865a3.5 3.5 0 1 0-3.306-6.17ZM214.838 126.204l-29.609 15.863a3.5 3.5 0 1 0 3.306 6.17l29.609-15.863a3.5 3.5 0 1 0-3.306-6.17ZM209.33 432.386a3.48 3.48 0 0 0 1.65-.416l29.61-15.865a3.5 3.5 0 1 0-3.306-6.17l-29.61 15.865a3.5 3.5 0 0 0 1.656 6.586ZM273.066 250.36a3.48 3.48 0 0 0 1.65-.417l29.61-15.864a3.5 3.5 0 1 0-3.306-6.17l-29.61 15.864a3.5 3.5 0 0 0 1.656 6.586ZM186.885 296.532a3.48 3.48 0 0 0 1.65-.416l29.609-15.863a3.5 3.5 0 1 0-3.306-6.17l-29.609 15.863a3.5 3.5 0 0 0 1.656 6.586ZM295.512 386.212a3.481 3.481 0 0 0 1.65-.416l29.61-15.863a3.5 3.5 0 1 0-3.306-6.17l-29.61 15.863a3.5 3.5 0 0 0 1.656 6.586ZM272.35 325.002h32.52a3.5 3.5 0 0 0 0-7h-32.52a3.5 3.5 0 0 0 0 7ZM203.63 338.377a3.5 3.5 0 0 0 3.5 3.5h32.52a3.5 3.5 0 0 0 0-7h-32.52a3.5 3.5 0 0 0-3.5 3.5Z"
            />
        </svg>
    );
}

function Lamp({ fillColorClass, height }: GraphicProps): ReactNode {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="17 2 66 96" height={height ?? "5em"}>
            <path
                className={fillColorClass}
                d="M81.5 37.656a6.138 6.138 0 0 1-5.313 2.969H23.813a6.258 6.258 0 0 1-5.31-2.961 6.255 6.255 0 0 1-.284-6.07l12.5-25a6.198 6.198 0 0 1 5.594-3.47h27.375a6.198 6.198 0 0 1 5.593 3.47l12.5 25a6.17 6.17 0 0 1-.28 6.062zM68.75 90.625H53.125V50a3.124 3.124 0 1 0-6.25 0v40.625H31.25a3.124 3.124 0 1 0 0 6.25h37.5a3.124 3.124 0 1 0 0-6.25z"
            />
        </svg>
    );
}
