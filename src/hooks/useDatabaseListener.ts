import { createEventSource } from "@/utils/requestUtils";
import { useCallback, useEffect, useState } from "react";

export const useDatabaseListener = <T>(initialValue: T, listenURL: string) => {
    const [value, setValue] = useState<T>(initialValue);

    const initializeListener = useCallback(() => {
        return createEventSource(listenURL, (event: MessageEvent<any>) => {
            setValue(JSON.parse(event.data));
        });
    }, [listenURL]);

    useEffect(() => {
        const eventSource = initializeListener();
        return () => eventSource.close();
    }, [initializeListener]);

    return { value };
};
