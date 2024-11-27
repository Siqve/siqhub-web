export const EVENT_STREAM_HEADERS = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
};

export const API_ROUTE = {
    SUPABASE: {
        ON_DB_UPDATE: "/api/supabase/on-db-update",
        ON_DB_ALL: "/api/supabase/on-db-all",
    },
} as const;
