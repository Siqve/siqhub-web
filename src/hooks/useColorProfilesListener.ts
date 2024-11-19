import { useDatabaseListenerWithInitialFetch } from "@/hooks/useDatabaseListener";
import { endpointBuilder } from "@/utils/endpointBuilder";
import { _getColors } from "@actions/supabase/color";
import { ColorProfileDB } from "@siqve/supabase-services";

type ColorsListenerResult = {
    colorProfiles: ColorProfileDB[] | undefined;
    isColorProfilesReady: boolean;
};

export const useColorProfilesListener = (): ColorsListenerResult => {
    const { value: colorProfiles, isReady: isColorProfilesReady } = useDatabaseListenerWithInitialFetch<ColorProfileDB[]>(
        _getColors,
        endpointBuilder().colorProfile().getAll(),
        _getColors,
    );

    return { colorProfiles, isColorProfilesReady };
};
