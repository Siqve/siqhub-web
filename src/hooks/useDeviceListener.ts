import { useDatabaseListener } from "@/hooks/useDatabaseListener";
import { endpointBuilder } from "@/utils/endpointBuilder";
import { Device } from "@/types/Device";

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
