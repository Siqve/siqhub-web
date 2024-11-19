import { useDatabaseListenerWithInitialFetch } from "@/hooks/useDatabaseListener";
import { endpointBuilder } from "@/utils/endpointBuilder";
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
        endpointBuilder().colorProfile(colorId).updates(),
    );

    return { colorProfile, isColorProfileReady };
};
