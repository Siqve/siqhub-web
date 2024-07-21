export const EVENT_STREAM_HEADERS = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
};

export const API_ROUTE = {
    FIRESTORE: {
        ON_SETTINGS_UPDATE: "/api/firestore/on-settings-update",
        ON_COLORS_UPDATE: "/api/firestore/on-colors-update",
    },
    SUPABASE: {
        ON_DEVICE_SETTINGS_UPDATE: "/api/supabase/on-device_settings-update",
    }
} as const;
