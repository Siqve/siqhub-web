"use server";

import { ColorProfileDB, ColorProfileInsertDB, ColorProfileUpdateDB } from "@siqve/supabase-services";
import { db } from "@/services/dbService";

export const _getColorProfile = async (colorId: string): Promise<ColorProfileDB | undefined> => {
    return db.table().colorProfile().select(colorId);
};

export const _getColorProfiles = async (): Promise<ColorProfileDB[] | undefined> => {
    return db.table().colorProfile().selectAll({column: "id", order: "asc" });
};

export const _insertColorProfiles = async (colorInsert: ColorProfileInsertDB): Promise<ColorProfileDB> => {
    return db.table().colorProfile().insert(colorInsert);
};

export const _updateColorProfiles = async (
    colorId: number,
    colorUpdate: ColorProfileUpdateDB,
): Promise<ColorProfileDB> => {
    return db.table().colorProfile().update(colorId.toString(), colorUpdate);
};

export const _deleteColorProfiles = async (colorId: number): Promise<ColorProfileDB> => {
    return db.table().colorProfile().delete(colorId.toString());
};
