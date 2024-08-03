export const DB_TABLES = {
    COLOR: {
        TABLE_NAME: "color",
        ID: "id",
        HEX: "hex",
        IMMUTABLE: "immutable",
    },
    COLOR_THEME: {
        TABLE_NAME: "color_theme",
        NAME: "name",
        GRADIENT_CLASS: "gradient_class",
        TEXT_CLASS: "text_class",
    },
    DEVICE: {
        TABLE_NAME: "device",
        ID: "id",
        NAME: "name",
        IP: "ip",
        SETTINGS_JSON: "settings_json",
        TYPE: "type",
        COLOR_THEME: "color_theme",
    },
    DEVICE_TYPE: {
        TABLE_NAME: "device_type",
        NAME: "name",
    },
} as const;
