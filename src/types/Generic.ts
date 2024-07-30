export type Exact<T, Shape> = T & {
    [K in keyof Shape]: K extends keyof T ? T[K] : never;
};
