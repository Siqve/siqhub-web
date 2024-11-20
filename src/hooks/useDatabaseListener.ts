import { createEventSource } from "@/utils/requestUtils";
import { useCallback, useEffect, useState } from "react";

type DatabaseListenerResult<T> = {
    value: T | undefined;
    isReady: boolean;
};

export const useDatabaseListener = <T>(
    initialValue: T | undefined,
    listenUrl: string,
    onUpdate?: () => Promise<T | undefined>,
): DatabaseListenerResult<T> => {
    const [state, setState] = useState<DatabaseListenerResult<T>>({
        value: initialValue,
        isReady: !!initialValue,
    });
    const [reconnectTrigger, setReconnectTrigger] = useState(0);

    const handleUpdate = useCallback((updatedValue: T | undefined) => {
        setState({ value: updatedValue, isReady: true });

    }, []);

    // Initialize the listener
    useEffect(() => {
        const eventSource = createEventSource(
            listenUrl,
            onUpdate ? () => onUpdate().then(handleUpdate) : handleUpdate,
        );

        eventSource.onerror = () => setReconnectTrigger((prev) => prev + 1);

        return () => eventSource.close();
    }, [listenUrl, handleUpdate, reconnectTrigger, onUpdate]);

    // Update the value when the initial value changes
    useEffect(() => {
        if (!initialValue) return;
        handleUpdate(initialValue);
    }, [initialValue, handleUpdate]);

    return state;
};

export const useDatabaseListenerWithInitialFetch = <T>(
    fetchInitial: () => Promise<T | undefined>,
    listenUrl: string,
    listenCallback?: () => Promise<T | undefined>,
): DatabaseListenerResult<T> => {
    const [initialValue, setInitialValue] = useState<T>();

    // Set the initial value
    useEffect(() => {
        fetchInitial().then(setInitialValue);
    }, [fetchInitial]);

    return useDatabaseListener<T>(initialValue, listenUrl, listenCallback);
};
