import { Tables, TablesInsert, TablesUpdate } from "@/libs/supabase/generated/database.types";

export type DeviceDB = Tables<"device">
export type DeviceInsertDB = TablesInsert<"device">
export type DeviceUpdateDB = TablesUpdate<"device">

export type DeviceTypeDB = Tables<"device_type">

export type ColorDB = Tables<"color">
export type ColorInsertDB = TablesInsert<"color">
export type ColorUpdateDB = TablesUpdate<"color">

export type ColorThemeDB = Tables<"color_theme">

export type SortOrder = "asc" | "desc";