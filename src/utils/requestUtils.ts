export const isServer = () => typeof window === "undefined";

export const getURLOrigin = (): string => window.location.origin;
