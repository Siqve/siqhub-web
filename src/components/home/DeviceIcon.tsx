import clsx from "clsx";
import Link from "next/link";
import { Device } from "@/types/Device";
import { HueGraphic } from "@components/graphic/HueGraphic";

export const DeviceIcon = ({ device }: { device: Device }) => {
    const redirectPage = `/device/${device.id}`;

    return (
        <div className="flex w-fit flex-col items-center gap-1">
            <Link href={redirectPage}>
                <div
                    className={clsx(
                        "flex items-center justify-center",
                        "h-28 w-28 rounded-full ",
                        device.gradientClass,
                    )}
                >
                    <HueGraphic graphicType={device.type} fillColorClass="fill-slate-950" />
                </div>
            </Link>
            <Link href={redirectPage}>
                <p className={device.textClass}>{device.name}</p>
            </Link>
        </div>
    );
};
