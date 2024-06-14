import { Content } from "@/containers/Content";
import { getDevice } from "@/managers/DeviceManager";
import { DeviceHeader } from "@components/device/DeviceHeader";
import { LedStripController } from "@components/led/LedStripController";
import { redirect } from "next/navigation";

const DevicePage = async ({ params }: { params: { id: string } }) => {
    const device = await getDevice(params.id);
    if (!device) redirect("/");

    return (
        <>
            <DeviceHeader device={device} />
            <Content>
                <LedStripController />
            </Content>
        </>
    );
};

export default DevicePage;
