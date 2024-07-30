"use server";

import { ColorDB, ColorInsertDB, ColorUpdateDB } from "@/libs/supabase/types";
import { getDB } from "@/services/dbService";

export const _getColor = async (colorId: string): Promise<ColorDB | undefined> => {
    return getDB().color().get(colorId);
};

export const _getColors = async (): Promise<ColorDB[] | undefined> => {
    return getDB().color().getAll("asc");
};

export const _insertColor = async (colorInsert: ColorInsertDB): Promise<ColorDB> => {
    return getDB().color().insert(colorInsert);
};

export const _updateColor = async (
    colorId: number,
    colorUpdate: ColorUpdateDB,
): Promise<ColorDB> => {
    return getDB().color().update(colorId.toString(), colorUpdate);
};

export const _deleteColor = async (colorId: number): Promise<ColorDB> => {
    return getDB().color().delete(colorId.toString());
};
