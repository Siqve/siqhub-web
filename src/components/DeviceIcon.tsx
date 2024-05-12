import Link from "next/link";
import { Device } from "@/types/Device";
import { HueGraphic } from "@components/graphic/HueGraphic";
import { CircleIcon } from "@components/CircleIcon";

export const DeviceIcon = ({ device }: { device: Device }) => {
    const redirectPage = `/device/${device.id}`;

    return (
        <div className="flex w-fit flex-col items-center gap-1">
            <Link href={redirectPage}>
                <CircleIcon circleClass={device.gradientClass}>
                    <HueGraphic
                        graphicType={device.type}
                        fillColorClass="fill-slate-950"
                    />
                </CircleIcon>
            </Link>
            <Link href={redirectPage}>
                <p className={device.textClass}>{device.name}</p>
            </Link>
        </div>
    );
};
