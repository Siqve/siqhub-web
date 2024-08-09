import {
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
    RealtimeChannel,
    RealtimePostgresChangesPayload,
} from "@supabase/realtime-js";
import { createRealtimeChannel } from "../../services/createRealtimeChannel";
import { supabaseTableActions } from "../../services/supabaseTableActions";
import { SortOrder } from "../../types";

export const actionFunctions = <T, T_INSERT, T_UPDATE>(
    tableName: string,
    column?: string,
    query?: string,
) => {
    return {
        getAll: async (order?: SortOrder): Promise<T[]> => {
            return supabaseTableActions().get().allTableRows<T>(tableName, query, order);
        },
        get: async (id: string): Promise<T | undefined> => {
            return supabaseTableActions()
                .get()
                .singleTableRow<T>(
                    tableName,
                    query,
                    column ? [{ column: column, value: id }] : undefined,
                );
        },
        insert: async (row: T_INSERT): Promise<T> => {
            return supabaseTableActions()
                .insert<T>(tableName, [row])
                .then((data) => data[0]);
        },
        update: async (rowId: string, rowUpdate: T_UPDATE): Promise<T> => {
            if (!column) {
                throw new Error("Column must be defined in order to update row");
            }
            return supabaseTableActions()
                .update<T>(tableName, { column: column, value: rowId }, rowUpdate)
                .then((data) => data[0]);
        },
        delete: async (rowId: string): Promise<T> => {
            if (!column) {
                throw new Error("Column must be defined in order to update row");
            }
            return supabaseTableActions()
                .delete<T>(tableName, {
                    column: column,
                    value: rowId,
                })
                .then((data) => data[0]);
        },
        listen: () => {
            return {
                onUpdate: (callback: (updatedRow: T) => void, rowId: string): RealtimeChannel => {
                    const filter = column && rowId ? `${column}=eq.${rowId}` : undefined;
                    return createRealtimeChannel<T>(
                        tableName,
                        callback,
                        REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.UPDATE,
                        filter,
                    ).subscribe();
                },
                onAll: (
                    callback: (updatedRow: RealtimePostgresChangesPayload<any>) => void,
                    rowId?: string,
                ): RealtimeChannel => {
                    const filter = column && rowId ? `${column}=eq.${rowId}` : undefined;
                    return createRealtimeChannel<RealtimePostgresChangesPayload<any>>(
                        tableName,
                        callback,
                        REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL,
                        filter,
                    ).subscribe();
                },
            };
        },
    };
};
