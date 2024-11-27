import { useDatabaseListenerWithInitialFetch } from "@/hooks/useDatabaseListener";
import { endpointBuilder } from "@/utils/endpointBuilder";
import { _getColorProfiles } from "@actions/supabase/colorProfile";
import { ColorProfileDB } from "@siqve/supabase-services";

type ColorsListenerResult = {
    colorProfiles: ColorProfileDB[] | undefined;
    isColorProfilesReady: boolean;
};

export const useColorProfilesListener = (): ColorsListenerResult => {
    const { value: colorProfiles, isReady: isColorProfilesReady } =
        useDatabaseListenerWithInitialFetch<ColorProfileDB[]>(
            _getColorProfiles,
            endpointBuilder().colorProfile().getAll(),
            _getColorProfiles,
        );

    return { colorProfiles, isColorProfilesReady };
};
