import { DB_TABLES } from "../constants";
import {
    ColorDB,
    ColorInsertDB,
    ColorUpdateDB,
    Device,
    DeviceInsertDB,
    DeviceUpdateDB,
} from "../types";
import { adminFunctions } from "./adminFunctions";
import { tableActionFunctions } from "./tableActionFunctions";

const DEVICE_QUERY = `${DB_TABLES.DEVICE.ID}, ${DB_TABLES.DEVICE.IP}, ${DB_TABLES.DEVICE.NAME}, ${DB_TABLES.DEVICE.TYPE}, ${DB_TABLES.DEVICE.SETTINGS_JSON}, \
${DB_TABLES.DEVICE.COLOR_THEME}(${DB_TABLES.COLOR_THEME.NAME}, ${DB_TABLES.COLOR_THEME.GRADIENT_CLASS}, ${DB_TABLES.COLOR_THEME.TEXT_CLASS})`;

const COLOR_QUERY = `${DB_TABLES.COLOR.ID}, ${DB_TABLES.COLOR.HEX}, ${DB_TABLES.COLOR.IMMUTABLE}`;

export const getDB = () => {
    return {
        color: () => {
            return tableActionFunctions<ColorDB, ColorInsertDB, ColorUpdateDB>(
                DB_TABLES.COLOR.TABLE_NAME,
                DB_TABLES.COLOR.ID,
                COLOR_QUERY,
            );
        },
        device: () => {
            return tableActionFunctions<Device, DeviceInsertDB, DeviceUpdateDB>(
                DB_TABLES.DEVICE.TABLE_NAME,
                DB_TABLES.DEVICE.ID,
                DEVICE_QUERY,
            );
        },
        custom: <T, T_RETURN, T_UPDATE>(tableName: string, column?: string, query?: string) => {
            return tableActionFunctions<T, T_RETURN, T_UPDATE>(tableName, column, query);
        },
        admin() {
            return adminFunctions();
        }
    };
};
