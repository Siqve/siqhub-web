import { Content } from "@/containers/Content";
import { db } from "@/services/dbService";
import { LedStripController } from "@components/controllers/LedStripController";
import { DeviceHeader } from "@components/device/DeviceHeader";
import { redirect } from "next/navigation";

type DevicePageProps = {
    searchParams?: { [key: string]: string | string[] | undefined };
};

const DevicePage = async ({ searchParams }: DevicePageProps) => {
    if (typeof searchParams?.id !== "string") redirect("/");

    const device = await db.table().device().select(searchParams.id);
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
