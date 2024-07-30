import { useDatabaseListener } from "@/hooks/useDatabaseListener";
import { getEndpoints } from "@/services/endpointService";
import { Device } from "@/types/Device";

type UseDeviceListenerReturn = {
    device: Device;
};

export const useDeviceListener = (initialValue: Device): UseDeviceListenerReturn => {
    const { value: device } = useDatabaseListener<Device>(
        initialValue,
        getEndpoints().device(initialValue.id).getUpdates(),
    );
    return { device };
};
