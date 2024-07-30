import { DB_TABLES } from "@/libs/supabase/constants";
import {
    ColorDB,
    ColorInsertDB,
    ColorUpdateDB,
    DeviceInsertDB,
    DeviceUpdateDB, SortOrder
} from "@/libs/supabase/types";
import { supabase } from "@/services/supabaseService";
import { Device } from "@/types/Device";

const DEVICE_QUERY = `${DB_TABLES.DEVICE.ID}, ${DB_TABLES.DEVICE.IP}, ${DB_TABLES.DEVICE.NAME}, ${DB_TABLES.DEVICE.TYPE}, ${DB_TABLES.DEVICE.SETTINGS_JSON}, \
${DB_TABLES.DEVICE.COLOR_THEME}(${DB_TABLES.COLOR_THEME.NAME}, ${DB_TABLES.COLOR_THEME.GRADIENT_CLASS}, ${DB_TABLES.COLOR_THEME.TEXT_CLASS})`;

const COLOR_QUERY = `${DB_TABLES.COLOR.ID}, ${DB_TABLES.COLOR.HEX}, ${DB_TABLES.COLOR.IMMUTABLE}`;

export const getDB = () => {
    let _tableName: string;
    let _query: string;
    let _idColumn: string;

    const _modeFunctions = <T, T_INSERT, T_UPDATE>() => {
        return {
            getAll: async (order?: SortOrder): Promise<T[]> => {
                return supabase.get.allTableRows<T>(_tableName, _query, order);
            },
            get: async (id: string): Promise<T | undefined> => {
                return supabase.get.singleTableRow<T>(_tableName, _query, [
                    { column: _idColumn, value: id },
                ]);
            },
            insert: async (row: T_INSERT): Promise<T> => {
                return supabase.insert<T>(_tableName, [row]).then((data) => data[0]);
            },
            update: async (rowId: string, rowUpdate: T_UPDATE): Promise<T> => {
                return supabase
                    .update<T>(_tableName, { column: _idColumn, value: rowId }, rowUpdate)
                    .then((data) => data[0]);
            },
            delete: async (rowId: string): Promise<T> => {
                return supabase
                    .delete<T>(_tableName, {
                        column: _idColumn,
                        value: rowId,
                    })
                    .then((data) => data[0]);
            },
        };
    };

    return {
        color() {
            _tableName = DB_TABLES.COLOR.TABLE_NAME;
            _query = COLOR_QUERY;
            _idColumn = DB_TABLES.COLOR.ID;
            return _modeFunctions<ColorDB, ColorInsertDB, ColorUpdateDB>();
        },
        device() {
            _tableName = DB_TABLES.DEVICE.TABLE_NAME;
            _query = DEVICE_QUERY;
            _idColumn = DB_TABLES.DEVICE.ID;
            return _modeFunctions<Device, DeviceInsertDB, DeviceUpdateDB>();
        },
    };
};
