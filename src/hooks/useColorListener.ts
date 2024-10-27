import { useDatabaseListenerWithInitialFetch } from "@/hooks/useDatabaseListener";
import { getEndpoints } from "@/services/endpointService";
import { _getColor } from "@actions/supabase/color";
import { ColorDB } from "@siqve/supabase-services";
import { useCallback } from "react";

type ColorListenerReturn = {
    color: ColorDB | undefined;
    isColorReady: boolean;
};

export const useColorListener = (colorId: string): ColorListenerReturn => {
    const getColor = useCallback(() => _getColor(colorId), [colorId]);

    const { value: color, isReady: isColorReady } = useDatabaseListenerWithInitialFetch<ColorDB>(
        getColor,
        getEndpoints().color(colorId).getUpdates(),
    );

    return { color, isColorReady };
};
