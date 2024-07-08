import { Content } from "@/containers/Content";
import { getDevice } from "@/managers/DeviceManager";
import { LedStripController } from "@components/controllers/LedStripController";
import { DeviceHeader } from "@components/device/DeviceHeader";
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
