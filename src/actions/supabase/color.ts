"use server";

import { ColorProfileDB, ColorProfileInsertDB, ColorProfileUpdateDB } from "@siqve/supabase-services";
import { db } from "@/services/dbService";

export const _getColor = async (colorId: string): Promise<ColorProfileDB | undefined> => {
    return db.table().colorProfile().select(colorId);
};

export const _getColors = async (): Promise<ColorProfileDB[] | undefined> => {
    return db.table().colorProfile().selectAll({column: "id", order: "asc" });
};

export const _insertColor = async (colorInsert: ColorProfileInsertDB): Promise<ColorProfileDB> => {
    return db.table().colorProfile().insert(colorInsert);
};

export const _updateColor = async (
    colorId: number,
    colorUpdate: ColorProfileUpdateDB,
): Promise<ColorProfileDB> => {
    return db.table().colorProfile().update(colorId.toString(), colorUpdate);
};

export const _deleteColor = async (colorId: number): Promise<ColorProfileDB> => {
    return db.table().colorProfile().delete(colorId.toString());
};
