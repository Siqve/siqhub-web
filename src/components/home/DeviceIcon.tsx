import { Device } from "@/managers/DeviceManager";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

export const DeviceIcon = ({ device }: { device: Device }) => {
    const redirectPage = `/device/${device.name}`;

    return (
        <div className="flex w-fit flex-col items-center gap-1">
            <Link href={redirectPage}>
                <div
                    className={clsx(
                        "flex justify-center",
                        "h-28 w-28 rounded-full ",
                        device.gradientClass,
                    )}
                >
                    <Image
                        src={device.type.graphic}
                        alt={device.type.name}
                        width="80"
                        height="0"
                    />
                </div>
            </Link>
            <Link href={redirectPage}>
                <p className={device.textClass}>{device.name}</p>
            </Link>
        </div>
    );
};
