import { getEndpoints } from "@/services/endpointService";
import { createEventSource } from "@/utils/requestUtils";
import { _getColor } from "@actions/supabase/color";
import { useCallback, useEffect, useState } from "react";
import { ColorDB } from "@siqve/supabase-services";

type UseColorListenerReturn = {
    hookStatus: HookStatus;
    color?: ColorDB;
};

export enum HookStatus {
    NOT_READY,
    READY,
}

export const useColorListener = (colorId: string): UseColorListenerReturn => {
    const [color, setColor] = useState<ColorDB>();
    const [hookStatus, setHookStatus] = useState<HookStatus>(HookStatus.NOT_READY);

    const initializeListener = useCallback(() => {
        return createEventSource(
            getEndpoints().color(colorId).getUpdates(),
            (event: MessageEvent<any>) => {
                setColor(JSON.parse(event.data));
                setHookStatus(HookStatus.READY);
            },
        );
    }, [colorId]);

    useEffect(() => {
        _getColor(colorId).then((initialValue) => {
            setColor(initialValue);
            setHookStatus(HookStatus.READY);
        });

        const eventSource = initializeListener();

        return () => eventSource.close();
    }, [colorId, initializeListener]);

    return { color, hookStatus };
};
