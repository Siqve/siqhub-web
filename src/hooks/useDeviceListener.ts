import { useDatabaseListener } from "@/hooks/useDatabaseListener";
import { getEndpoints } from "@/services/endpointService";
import { Device } from "@/types/Device";

type DeviceListenerReturn = {
    device: Device | undefined;
    isDeviceReady: boolean;
};

export const useDeviceListener = (initialValue: Device): DeviceListenerReturn => {
    const { value: device, isReady: isDeviceReady } = useDatabaseListener<Device>(
        initialValue,
        getEndpoints().device(initialValue.id).getUpdates(),
    );
    return { device, isDeviceReady };
};
