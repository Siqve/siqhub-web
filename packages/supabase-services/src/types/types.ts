import { Tables, TablesInsert, TablesUpdate } from "../generated/database.types";

export type DeviceDB = Tables<"device">;
export type DeviceInsertDB = TablesInsert<"device">;
export type DeviceUpdateDB = TablesUpdate<"device">;

export type DeviceTypeDB = Tables<"device_type">;

export type ColorProfileDB = Tables<"color_profile">;
export type ColorProfileInsertDB = TablesInsert<"color_profile">;
export type ColorProfileUpdateDB = TablesUpdate<"color_profile">;

export type ColorThemeDB = Tables<"color_theme">;

export type SortOrder = {
    column: string;
    order: "asc" | "desc";
};
