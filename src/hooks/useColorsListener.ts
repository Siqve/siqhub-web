import { ColorDB } from "@/libs/supabase/types";
import { getEndpoints } from "@/services/endpointService";
import { createEventSource } from "@/utils/requestUtils";
import { _getColors } from "@actions/supabase/color";
import { useCallback, useEffect, useState } from "react";

type UseColorListenerReturn = {
    colors: ColorDB[];
};

export const useColorsListener = (): UseColorListenerReturn => {
    const [colors, setColors] = useState<ColorDB[]>([]);

    const getAndUpdateColors = useCallback(() => {
        _getColors().then((colors) => {
            if (!colors) return;
            setColors(colors);
        });
    }, []);

    const initializeListener = useCallback(() => {
        return createEventSource(getEndpoints().color().getAll(), () => {
            getAndUpdateColors();
        });
    }, [getAndUpdateColors]);

    useEffect(() => {
        getAndUpdateColors();
        const eventSource = initializeListener();

        return () => eventSource.close();
    }, [getAndUpdateColors, initializeListener]);

    return { colors };
};
