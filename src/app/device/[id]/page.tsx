import { Content } from "@/containers/Content";
import { db } from "@/services/dbService";
import { LedStripController } from "@components/controllers/LedStripController";
import { DeviceHeader } from "@components/device/DeviceHeader";
import { redirect } from "next/navigation";

type DevicePageProps = {
    params?: Promise<{ id: string }>;
};

const DevicePage = async ({ params }: DevicePageProps) => {
    const slugParams = await params;
    if (!slugParams?.id) redirect("/");
    const device = await db.table().device().select(slugParams.id);
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
