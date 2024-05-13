import { getDevice } from "@/managers/DeviceManager";
import { redirect } from "next/navigation";
import { DeviceHeader } from "@components/device/DeviceHeader";
import { LedStripController } from "@components/led/LedStripController";

const DevicePage = async ({ params }: { params: { id: string } }) => {
    const device = await getDevice(params.id);
    if (!device) redirect("/");

    return (
        <div>
            <DeviceHeader device={device} />
            <LedStripController />
        </div>
    );
};

export default DevicePage;
