import { getEndpoints } from "@/services/endpointService";
import { createEventSource } from "@/utils/requestUtils";
import { _getColor } from "@actions/supabase/color";
import { ColorDB } from "@siqve/supabase-services";
import { useCallback, useEffect, useState } from "react";

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
    const [reconnectCounter, setReconnectCounter] = useState<number>(0);

    const updateColor = (color: ColorDB | undefined) => {
        setColor(color);
        setHookStatus(HookStatus.READY);
    };

    const initializeListener = useCallback(() => {
        const eventSource = createEventSource(
            getEndpoints().color(colorId).getUpdates(),
            (event: MessageEvent<any>) => updateColor(JSON.parse(event.data)),
        );

        eventSource.onerror = () => {
            setReconnectCounter((prev) => prev + 1);
        };
        return eventSource;
    }, [colorId]);

    // Initialize the listener
    useEffect(() => {
        const eventSource = initializeListener();

        return () => eventSource.close();
    }, [initializeListener, reconnectCounter]);

    // Get the initial color
    useEffect(() => {
        _getColor(colorId).then(updateColor);
    }, [colorId]);

    return { color, hookStatus };
};
