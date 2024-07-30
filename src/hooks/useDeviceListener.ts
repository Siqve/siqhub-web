import { useDatabaseListener } from "@/hooks/useDatabaseListener";
import { getEndpoints } from "@/services/endpointService";
import { Device2 } from "@/types/Device";

type UseDeviceListenerReturn = {
    device: Device2;
};

export const useDeviceListener = (initialValue: Device2): UseDeviceListenerReturn => {
    const { value: device } = useDatabaseListener<Device2>(
        initialValue,
        getEndpoints().device(initialValue.id).getUpdates(),
    );
    return { device };
};
