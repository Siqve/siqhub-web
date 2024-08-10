import {
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
    RealtimeChannel,
    RealtimePostgresChangesPayload,
} from "@supabase/realtime-js";
import { AuthTokenResponsePassword } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { getSupabaseClient, middlewareCheck, SUPABASE_ENVS } from "../supabase";
import { SortOrder } from "../types";
import { createRealtimeChannel } from "../utils/createRealtimeChannel";

type eq = {
    column: string;
    value: string | number;
};

export const supabaseService = {
    table: () => ({
        get: () => getActions(),
        insert: async <T>(tableName: string, row: any[]): Promise<T[]> => {
            const { data, error } = await getSupabaseClient()
                .from(tableName)
                .insert(row)
                .select()
                .returns<T[]>();
            if (!data) {
                throw new Error(
                    `Error inserting row. Table name: ${tableName}, row: ${JSON.stringify(row)}. Error: ${error?.message}`,
                );
            }

            return data;
        },
        update: async <T>(tableName: string, eq: eq, row: any): Promise<T[]> => {
            const { data, error } = await getSupabaseClient()
                .from(tableName)
                .update(row)
                .eq(eq.column, eq.value)
                .select()
                .returns<T[]>();
            if (!data) {
                throw new Error(
                    `Error updating row. Table name: ${tableName}, row: ${JSON.stringify(row)}. Error: ${error?.message}`,
                );
            }

            return data;
        },
        delete: async <T>(tableName: string, eq: eq): Promise<T[]> => {
            const { data, error } = await getSupabaseClient()
                .from(tableName)
                .delete()
                .eq(eq.column, eq.value)
                .select()
                .returns<T[]>();
            if (!data) {
                throw new Error(
                    `Error deleting row. Table name: ${tableName}, column: ${eq.column}, value: ${eq.value}. Error: ${error?.message}`,
                );
            }

            return data;
        },
        listen: () => {
            return {
                onUpdate: <T>(
                    tableName: string,
                    callback: (updatedRow: T) => void,
                    eq?: eq,
                ): RealtimeChannel => {
                    const filter = eq ? `${eq.column}=eq.${eq.value}` : undefined;
                    return createRealtimeChannel<T>(
                        tableName,
                        callback,
                        REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.UPDATE,
                        filter,
                    ).subscribe();
                },
                onAll: (
                    tableName: string,
                    callback: (updatedRow: RealtimePostgresChangesPayload<any>) => void,
                    eq?: eq,
                ): RealtimeChannel => {
                    const filter = eq ? `${eq.column}=eq.${eq.value}` : undefined;
                    return createRealtimeChannel<RealtimePostgresChangesPayload<any>>(
                        tableName,
                        callback,
                        REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL,
                        filter,
                    ).subscribe();
                },
            };
        },
        removeListener: (channel: RealtimeChannel) => {
            void getSupabaseClient().removeChannel(channel);
        },
    }),
    admin: () => ({
        login: (): Promise<AuthTokenResponsePassword> => {
            return getSupabaseClient().auth.signInWithPassword({
                email: SUPABASE_ENVS.EMAIL!,
                password: SUPABASE_ENVS.PASSWORD!,
            });
        },
        middlewareCheck: (request: NextRequest) => {
            return middlewareCheck(request);
        },
    }),
};

function getActions() {
    return {
        tableRows: async <T>(
            tableName: string,
            selectQuery?: string,
            eq?: eq[],
            order?: SortOrder,
        ): Promise<T[]> => {
            let queryBuilder = getSupabaseClient().from(tableName).select(selectQuery);

            eq?.forEach((condition) => {
                queryBuilder = queryBuilder.eq(condition.column, condition.value);
            });

            if (order) {
                queryBuilder = queryBuilder.order("id", { ascending: order === "asc" });
            }

            const { data, error } = await queryBuilder.returns<T[]>();
            if (!data) {
                throw new Error(`Error getting table rows. Table name: ${tableName}, \
            selectQuery: ${selectQuery}, eq: ${JSON.stringify(eq)}. Error: ${error?.message}`);
            }

            return data;
        },
        allTableRows: async <T>(
            tableName: string,
            selectQuery?: string,
            order?: SortOrder,
        ): Promise<T[]> => {
            return getActions().tableRows<T>(tableName, selectQuery, undefined, order);
        },
        singleTableRow: async <T>(
            tableName: string,
            selectQuery?: string,
            eq?: eq[],
        ): Promise<T | undefined> => {
            const data = await getActions().tableRows<T>(tableName, selectQuery, eq);
            return data[0];
        },
    };
}
