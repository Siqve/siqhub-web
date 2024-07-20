import { CardListSection } from "@/containers/CardListSection";
import { getDeviceList } from "@/services/deviceService";
import { DeviceIcon } from "@components/DeviceIcon";

export const DeviceList = async () => {
    const devices = await getDeviceList();
    return (
        <div className="m-5">
            <CardListSection title="Devices">
                {devices.map((device) => (
                    <DeviceIcon key={device.name} device={device} />
                ))}
            </CardListSection>
        </div>
    );
};
