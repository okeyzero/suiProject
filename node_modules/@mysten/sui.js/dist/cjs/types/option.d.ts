export type Option<T> = T | {
    fields: {
        vec: '';
    };
    type: string;
};
export declare function getOption<T>(option: Option<T>): T | undefined;
