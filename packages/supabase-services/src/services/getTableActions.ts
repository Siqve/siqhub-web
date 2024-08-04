import { getSupabaseClient } from "../config";
import { SortOrder } from "../types";

type eq = {
    column: string;
    value: string | number;
};

export const getTableActions = () => ({
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
});

function getActions() {
    return {
        tableRows: async <T>(
            tableName: string,
            selectQuery?: string,
            eq?: eq[],
            order?: SortOrder,
        ): Promise<T[]> => {
            let queryBuilder = getSupabaseClient().from(tableName).select(selectQuery); // TODO Test what happens if selectQuery is null

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