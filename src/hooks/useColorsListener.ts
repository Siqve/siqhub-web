import { useDatabaseListenerWithInitialFetch } from "@/hooks/useDatabaseListener";
import { getEndpoints } from "@/services/endpointService";
import { _getColors } from "@actions/supabase/color";
import { ColorDB } from "@siqve/supabase-services";

type ColorsListenerResult = {
    colors: ColorDB[] | undefined;
    isColorsReady: boolean;
};

export const useColorsListener = (): ColorsListenerResult => {
    const { value: colors, isReady: isColorsReady } = useDatabaseListenerWithInitialFetch<ColorDB[]>(
        _getColors,
        getEndpoints().color().getAll(),
        _getColors,
    );

    return { colors, isColorsReady };
};
