import { useDatabaseListenerWithInitialFetch } from "@/hooks/useDatabaseListener";
import { endpointBuilder } from "@/utils/endpointBuilder";
import { _getColorProfile } from "@actions/supabase/colorProfile";
import { ColorProfileDB } from "@siqve/supabase-services";
import { useCallback } from "react";

type ColorListenerReturn = {
    colorProfile: ColorProfileDB | undefined;
    isColorProfileReady: boolean;
};

export const useColorProfileListener = (colorId: string): ColorListenerReturn => {
    const getColorProfile = useCallback(() => _getColorProfile(colorId), [colorId]);

    const { value: colorProfile, isReady: isColorProfileReady } =
        useDatabaseListenerWithInitialFetch<ColorProfileDB>(
            getColorProfile,
            endpointBuilder().colorProfile(colorId).updates(),
        );

    return { colorProfile, isColorProfileReady };
};
