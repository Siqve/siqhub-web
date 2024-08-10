import { Content } from "@/containers/Content";
import { LedStripController } from "@components/controllers/LedStripController";
import { DeviceHeader } from "@components/device/DeviceHeader";
import { redirect } from "next/navigation";
import { db } from "@/services/dbService";

const DevicePage = async ({ params }: { params: { id: string } }) => {
    const device = await db.table().device().get(params.id);
    if (!device) redirect("/");

    return (
        <>
            <DeviceHeader device={device} />
            <Content>
                <LedStripController initialDevice={device} />
            </Content>
        </>
    );
};

export default DevicePage;
