export declare function has_key<O>(obj: O, key: keyof any): key is keyof O;
export declare function serialize(obj: unknown, prefix?: string): string;
export declare function deep_clone<T>(obj: T): T;
