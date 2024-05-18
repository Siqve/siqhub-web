import { X } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Device } from "@/types/Device";
import { HueGraphic } from "@components/graphic/HueGraphic";
import { COLORS } from "@/styles/colors";
import { Header } from "@/containers/Header";

export const DeviceHeader = ({ device }: { device: Device }) => {
    return (
        <Header>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <HueGraphic
                    graphicType={device.type}
                    fillColorClass="fill-text-main"
                    height="3.5em"
                />
                <h2 className="text-5xl">{device.name}</h2>
            </div>
            <Link href="/">
                <X color={COLORS["base-content"]} size="42" />
            </Link>
        </div>

        </Header>
    );
};
