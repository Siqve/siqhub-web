import { getDeviceList } from "@/managers/DeviceManager";
import { DeviceIcon } from "@components/DeviceIcon";

export const DeviceList = async () => {
    const devices = await getDeviceList();
    return (
        <div className="m-5 flex flex-col gap-4 rounded-3xl p-4 shadow-[0_0_10px_1px_rgba(0,0,0,0.5)]">
            <h2>Devices</h2>
            <div className="flex gap-3">
                {devices.map((device) => (
                    <DeviceIcon key={device.name} device={device} />
                ))}
            </div>
        </div>
    );
};
