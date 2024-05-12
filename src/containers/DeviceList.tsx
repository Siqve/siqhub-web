import { getDeviceList } from "@/managers/DeviceManager";
import { DeviceIcon } from "@components/DeviceIcon";

export const DeviceList = async () => {
    const devices = await getDeviceList();
    return (
        <div className="m-5 flex flex-col gap-3">
            <h2 className="w-fit px-3 shadow-[0_6px_5px_-5px_rgba(0,0,0,0.5)]">
                Devices
            </h2>
            <div className="flex gap-3 pl-3">
                {devices.map((device) => (
                    <DeviceIcon key={device.name} device={device} />
                ))}
            </div>
        </div>
    );
};
