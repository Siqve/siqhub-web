import { DB_TABLES } from "@/constants/database";
import { supabaseService } from "@siqve/supabase-services";
import {
    ColorDB,
    ColorInsertDB,
    ColorUpdateDB,
    Device,
    DeviceInsertDB,
    DeviceUpdateDB,
    SortOrder,
} from "@siqve/supabase-services/dist/types";
import { RealtimeChannel, RealtimePostgresChangesPayload } from "@supabase/realtime-js";

const DEVICE_QUERY = `${DB_TABLES.DEVICE.ID}, ${DB_TABLES.DEVICE.IP}, ${DB_TABLES.DEVICE.NAME}, ${DB_TABLES.DEVICE.TYPE}, ${DB_TABLES.DEVICE.SETTINGS_JSON}, \
${DB_TABLES.DEVICE.COLOR_THEME}(${DB_TABLES.COLOR_THEME.NAME}, ${DB_TABLES.COLOR_THEME.GRADIENT_CLASS}, ${DB_TABLES.COLOR_THEME.TEXT_CLASS})`;

const COLOR_QUERY = `${DB_TABLES.COLOR.ID}, ${DB_TABLES.COLOR.HEX}, ${DB_TABLES.COLOR.IMMUTABLE}`;

export const db = {
    table: () => ({
        color: () => {
            return tableActions<ColorDB, ColorInsertDB, ColorUpdateDB>(
                DB_TABLES.COLOR.TABLE_NAME,
                DB_TABLES.COLOR.ID,
                COLOR_QUERY,
            );
        },
        device: () => {
            return tableActions<Device, DeviceInsertDB, DeviceUpdateDB>(
                DB_TABLES.DEVICE.TABLE_NAME,
                DB_TABLES.DEVICE.ID,
                DEVICE_QUERY,
            );
        },
        custom: <T, T_RETURN, T_UPDATE>(tableName: string, column?: string, query?: string) => {
            return tableActions<T, T_RETURN, T_UPDATE>(tableName, column, query);
        },
    }),
    removeListener(channel: RealtimeChannel) {
        return supabaseService.table().removeListener(channel);
    },
};

function tableActions<T, T_INSERT, T_UPDATE>(tableName: string, column?: string, query?: string) {
    return {
        selectAll: async (order?: SortOrder): Promise<T[]> => {
            return supabaseService.table().select().allTableRows<T>(tableName, query, order);
        },
        select: async (id: string): Promise<T | undefined> => {
            return supabaseService
                .table()
                .select()
                .singleTableRow<T>(
                    tableName,
                    query,
                    column ? [{ column: column, value: id }] : undefined,
                );
        },
        insert: async (row: T_INSERT): Promise<T> => {
            return supabaseService
                .table()
                .insert<T>(tableName, [row])
                .then((data) => data[0]);
        },
        update: async (rowId: string, rowUpdate: T_UPDATE): Promise<T> => {
            assertColumn(column);
            return supabaseService
                .table()
                .update<T>(tableName, { column: column!, value: rowId }, rowUpdate)
                .then((data) => data[0]);
        },
        delete: async (rowId: string): Promise<T> => {
            assertColumn(column);
            return supabaseService
                .table()
                .delete<T>(tableName, {
                    column: column!,
                    value: rowId,
                })
                .then((data) => data[0]);
        },
        listen: () => {
            return {
                onUpdate: (callback: (updatedRow: T) => void, rowId: string): RealtimeChannel => {
                    assertColumn(column);
                    return supabaseService
                        .table()
                        .listen()
                        .onUpdate(tableName, callback, { column: column!, value: rowId });
                },
                onAll: (
                    callback: (updatedRow: RealtimePostgresChangesPayload<any>) => void,
                    rowId?: string,
                ): RealtimeChannel => {
                    return supabaseService
                        .table()
                        .listen()
                        .onAll(
                            tableName,
                            callback,
                            column && rowId ? { column: column, value: rowId } : undefined,
                        );
                },
            };
        },
    };
}

function assertColumn(column: string | undefined) {
    if (!column) {
        throw new Error("Column must be defined in order to update row");
    }
}
