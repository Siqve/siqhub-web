import { API_ROUTE } from "@/app/api/constants";
import { DB_TABLES } from "@/libs/supabase/constants";

export const getEndpoints = () => {
    let _url: string;
    let _tableName: string;
    let _columnId: string;
    let _rowValue: string | undefined;

    const _getURL = () => {
        return (
            `${_url}?tableName=${_tableName}` +
            (_columnId && _rowValue ? `&columnId=${_columnId}&rowValue=${_rowValue}` : "")
        );
    };

    const _modeFunctions = {
        getAll() {
            _url = API_ROUTE.SUPABASE.ON_DB_ALL;
            return _getURL();
        },
        getUpdates() {
            _url = API_ROUTE.SUPABASE.ON_DB_UPDATE;
            return _getURL();
        },
    };

    return {
        color(colorId?: string) {
            _tableName = DB_TABLES.COLOR.TABLE_NAME;
            _columnId = DB_TABLES.COLOR.ID;
            _rowValue = colorId;
            return _modeFunctions;
        },
        device(deviceId?: string) {
            _tableName = DB_TABLES.DEVICE.TABLE_NAME;
            _columnId = DB_TABLES.DEVICE.ID;
            _rowValue = deviceId;
            return _modeFunctions;
        },
    };
};
