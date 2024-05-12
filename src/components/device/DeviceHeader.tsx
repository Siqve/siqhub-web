import { X } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Device } from "@/types/Device";
import { HueGraphic } from "@components/graphic/HueGraphic";
import { COLORS } from "@/styles/colors";

export const DeviceHeader = ({ device }: { device: Device }) => {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-b-text-main p-6">
            <div className="flex items-center gap-3">
                <HueGraphic
                    graphicType={device.type}
                    fillColorClass="fill-text-main"
                    height="3em"
                />
                <h2 className="text-5xl">{device.name}</h2>
            </div>
            <Link href="/">
                <X color={COLORS["base-content"]} size="42" />
            </Link>
        </div>
    );
};
