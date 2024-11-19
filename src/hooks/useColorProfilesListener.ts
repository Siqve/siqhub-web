import { useDatabaseListenerWithInitialFetch } from "@/hooks/useDatabaseListener";
import { getEndpoints } from "@/services/endpointService";
import { _getColors } from "@actions/supabase/color";
import { ColorProfileDB } from "@siqve/supabase-services";

type ColorsListenerResult = {
    colorProfiles: ColorProfileDB[] | undefined;
    isColorProfilesReady: boolean;
};

export const useColorProfilesListener = (): ColorsListenerResult => {
    const { value: colorProfiles, isReady: isColorProfilesReady } = useDatabaseListenerWithInitialFetch<ColorProfileDB[]>(
        _getColors,
        getEndpoints().colorProfile().getAll(),
        _getColors,
    );

    return { colorProfiles, isColorProfilesReady };
};
