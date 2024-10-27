export const isServer = () => typeof window === "undefined";

export const getURLOrigin = (): string => window.location.origin;

export const createEventSource = (
    url: string,
    callback: (object: any) => void,
): EventSource => {
    if (isServer()) throw new Error("EventSource is not supported on server side.");

    const eventSource = new EventSource(url);
    eventSource.onmessage = (event) => callback(JSON.parse(event.data));
    return eventSource;
};
