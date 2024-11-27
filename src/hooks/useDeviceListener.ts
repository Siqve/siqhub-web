import { useDatabaseListener } from "@/hooks/useDatabaseListener";
import { Device } from "@/types/Device";
import { endpointBuilder } from "@/utils/endpointBuilder";

type DeviceListenerReturn = {
    device: Device | undefined;
    isDeviceReady: boolean;
};

export const useDeviceListener = (initialValue: Device): DeviceListenerReturn => {
    const { value: device, isReady: isDeviceReady } = useDatabaseListener<Device>(
        initialValue,
        endpointBuilder().device(initialValue.id).updates(),
    );
    return { device, isDeviceReady };
};
