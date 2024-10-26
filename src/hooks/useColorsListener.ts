import { getEndpoints } from "@/services/endpointService";
import { createEventSource } from "@/utils/requestUtils";
import { _getColors } from "@actions/supabase/color";
import { ColorDB } from "@siqve/supabase-services";
import { useCallback, useEffect, useState } from "react";

type UseColorListenerReturn = {
    colors: ColorDB[];
};

export const useColorsListener = (): UseColorListenerReturn => {
    const [colors, setColors] = useState<ColorDB[]>([]);
    const [reconnectCounter, setReconnectCounter] = useState<number>(0);

    const getAndUpdateColors = useCallback(() => {
        _getColors().then((colors) => {
            if (!colors) return;
            setColors(colors);
        });
    }, []);

    const initializeListener = useCallback(() => {
        const eventSource = createEventSource(getEndpoints().color().getAll(), getAndUpdateColors);

        eventSource.onerror = () => {
            setReconnectCounter((prev) => prev + 1);
        };

        return eventSource;
    }, [getAndUpdateColors]);

    // Initialize the listener
    useEffect(() => {
        const eventSource = initializeListener();

        return () => eventSource.close();
    }, [initializeListener, reconnectCounter]);

    // Get the initial colors
    useEffect(() => {
        getAndUpdateColors();
    }, [getAndUpdateColors]);

    return { colors };
};
