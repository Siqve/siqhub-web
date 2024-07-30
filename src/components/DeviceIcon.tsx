import { CircleIcon } from "@/containers/CircleIcon";
import { HueGraphic } from "@components/graphic/HueGraphic";
import Link from "next/link";
import { Device } from "@/types/Device";

export type DeviceIconProps = {
    device: Device;
};

export const DeviceIcon = ({ device }: DeviceIconProps) => {
    const redirectPage = `/device/${device.id}`;

    return (
        <div className="flex w-fit flex-col items-center gap-1">
            <Link href={redirectPage}>
                <CircleIcon circleClass={device.color_theme.gradient_class} size="large">
                    <HueGraphic graphicType={device.type} fillColorClass="fill-slate-950" />
                </CircleIcon>
            </Link>
            <Link href={redirectPage}>
                <p className={device.color_theme.text_class}>{device.name}</p>
            </Link>
        </div>
    );
};
