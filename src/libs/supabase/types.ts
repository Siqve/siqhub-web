import { Tables } from "@/libs/supabase/generated/database.types";

export type DeviceDB = Tables<"device">
export type DeviceTypeDB = Tables<"device_type">

export type ColorDB = Tables<"color">
export type ColorThemeDB = Tables<"color_theme">

export type DeviceSettingsDB = Tables<"device_settings">
