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
} as const;
