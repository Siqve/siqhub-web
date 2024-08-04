import { Content } from "@/containers/Content";
import { LedStripController } from "@components/controllers/LedStripController";
import { DeviceHeader } from "@components/device/DeviceHeader";
import { redirect } from "next/navigation";
import { getDB } from "@siqve/supabase-services";

const DevicePage = async ({ params }: { params: { id: string } }) => {
    const device = await getDB().device().get(params.id);
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
