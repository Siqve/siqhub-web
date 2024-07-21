import { getSupabaseClient } from "@/libs/supabase/supabase";
import { sendDataWithStreamController } from "@/utils/apiUtils";
import { REALTIME_POSTGRES_CHANGES_LISTEN_EVENT, RealtimeChannel } from "@supabase/realtime-js";
import { RealtimePostgresChangesFilter } from "@supabase/realtime-js/src/RealtimeChannel";

type eq = {
    column: string;
    value: string | number;
}

type EventType = REALTIME_POSTGRES_CHANGES_LISTEN_EVENT[keyof REALTIME_POSTGRES_CHANGES_LISTEN_EVENT];

export const supabase = {
    getTableRows: async <T>(tableName: string, selectQuery?: string, eq?: eq[]): Promise<T[]> => {
        let selectBuilder = getSupabaseClient()
            .from(tableName)
            .select(selectQuery);

        if (eq) {
            eq.forEach((condition) => {
                selectBuilder = selectBuilder.eq(condition.column, condition.value);
            });
        }

        const { data, error } = await selectBuilder.returns<T[]>();
        if (!data) {
            throw new Error(`Error getting table rows. Table name: ${tableName}, \
            selectQuery: ${selectQuery}, eq: ${JSON.stringify(eq)}. Error: ${error}`);
        }

        return data;
    },
    getAllTableRows: async <T>(tableName: string, selectQuery?: string): Promise<T[]> => {
        return supabase.getTableRows<T>(tableName, selectQuery);
    },
    getSingleTableRow: async <T>(tableName: string, selectQuery?: string, eq?: eq[]): Promise<T | undefined> => {
        const data = await supabase.getTableRows<T>(tableName, selectQuery, eq);
        return data[0];
    },
    createUpdateListener: <T>(tableName: string, callback: (updatedRow: T) => void, filter?: string): RealtimeChannel => {
        return getSupabaseClient()
            .channel(`realtime_${tableName}_${Date.now()}`)
            .on("postgres_changes", { table: tableName, filter, event: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.UPDATE, schema: "public" }, (payload) => {
                callback(payload.new as T);
            })
            .subscribe();
    }
};