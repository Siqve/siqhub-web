import { ColorDB } from "@/libs/supabase/types";
import { getEndpoints } from "@/services/endpointService";
import { createEventSource } from "@/utils/requestUtils";
import { _getColor } from "@actions/supabase/color";
import { useCallback, useEffect, useState } from "react";

type UseColorListenerReturn = {
    color: ColorDB | undefined;
};

export const useColorListener = (colorId: string): UseColorListenerReturn => {
    const [color, setColor] = useState<ColorDB>();

    const initializeListener = useCallback(() => {
        return createEventSource(
            getEndpoints().color(colorId).getUpdates(),
            (event: MessageEvent<any>) => {
                setColor(JSON.parse(event.data));
            },
        );
    }, [colorId]);

    useEffect(() => {
        _getColor(colorId).then((initialValue) => {
            setColor(initialValue);
        });

        const eventSource = initializeListener();

        return () => eventSource.close();
    }, [colorId, initializeListener]);

    return { color };
};
