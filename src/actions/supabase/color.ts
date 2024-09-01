"use server";

import { ColorDB, ColorInsertDB, ColorUpdateDB } from "@siqve/supabase-services";
import { db } from "@/services/dbService";

export const _getColor = async (colorId: string): Promise<ColorDB | undefined> => {
    return db.table().color().select(colorId);
};

export const _getColors = async (): Promise<ColorDB[] | undefined> => {
    return db.table().color().selectAll({column: "id", order: "asc" });
};

export const _insertColor = async (colorInsert: ColorInsertDB): Promise<ColorDB> => {
    return db.table().color().insert(colorInsert);
};

export const _updateColor = async (
    colorId: number,
    colorUpdate: ColorUpdateDB,
): Promise<ColorDB> => {
    return db.table().color().update(colorId.toString(), colorUpdate);
};

export const _deleteColor = async (colorId: number): Promise<ColorDB> => {
    return db.table().color().delete(colorId.toString());
};
