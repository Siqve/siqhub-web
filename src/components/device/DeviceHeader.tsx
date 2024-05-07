import { X } from "@phosphor-icons/react/dist/ssr";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";
import Link from "next/link";
import { Device } from "@/types/Device";
import { HueGraphic } from "@components/graphic/HueGraphic";

export const DeviceHeader = ({ device }: { device: Device }) => {
    const fullConfig = resolveConfig(tailwindConfig);
    type configWithCustomColor = typeof fullConfig & {
        theme: { colors: { text: { "header-main": string } } };
    };

    return (
        <div className="flex items-center justify-between gap-4 border-b border-text-header-main p-6">
            <div className="flex items-center gap-3">
                <HueGraphic
                    graphicType={device.type}
                    fillColorClass="fill-text-header-main"
                    height="3em"
                />
                <h2 className="text-5xl">{device.name}</h2>
            </div>
            <Link href="/">
                <X
                    color={
                        (fullConfig as configWithCustomColor).theme.colors.text[
                            "header-main"
                        ]
                    }
                    size="42"
                />
            </Link>
        </div>
    );
};
