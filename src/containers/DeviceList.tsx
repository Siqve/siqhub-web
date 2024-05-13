import { getDeviceList } from "@/managers/DeviceManager";
import { DeviceIcon } from "@components/DeviceIcon";
import { Card } from "@/containers/Card";

export const DeviceList = async () => {
    const devices = await getDeviceList();
    return (
        <div className="m-5 flex flex-col gap-1">
            <h2 className="w-fit">Devices</h2>
            <Card>
                <div className="flex gap-3">
                    {devices.map((device) => (
                        <DeviceIcon key={device.name} device={device} />
                    ))}
                </div>
            </Card>
        </div>
    );
};
