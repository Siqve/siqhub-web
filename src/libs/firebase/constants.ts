const DEVICES = {
    ID: "devices",
};

const COLORS = {
    ID: "colors",
    COLUMN: {
        CREATED_AT: "createdAt",
    },
};

const ICON_CLASS = {
    ID: "iconClass",
};

const GENERAL = {
    ID: "general",
    SETTINGS: {
        ID: "settings",
    },
} as const;

export const COLLECTIONS = {
    DEVICES,
    COLORS,
    ICON_CLASS,
    GENERAL,
} as const;

export const FIRESTORE = {
    COLLECTION: COLLECTIONS,
};
