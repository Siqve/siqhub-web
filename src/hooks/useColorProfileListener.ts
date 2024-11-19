import { useDatabaseListenerWithInitialFetch } from "@/hooks/useDatabaseListener";
import { getEndpoints } from "@/services/endpointService";
import { _getColor } from "@actions/supabase/color";
import { ColorProfileDB } from "@siqve/supabase-services";
import { useCallback } from "react";

type ColorListenerReturn = {
    colorProfile: ColorProfileDB | undefined;
    isColorProfileReady: boolean;
};

export const useColorProfileListener = (colorId: string): ColorListenerReturn => {
    const getColor = useCallback(() => _getColor(colorId), [colorId]);

    const { value: colorProfile, isReady: isColorProfileReady } = useDatabaseListenerWithInitialFetch<ColorProfileDB>(
        getColor,
        getEndpoints().colorProfile(colorId).getUpdates(),
    );

    return { colorProfile, isColorProfileReady };
};
