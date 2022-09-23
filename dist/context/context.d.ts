/**
 * Context module
 *
 * The Context calss is an abstraction for handling configuration object and
 * environmental variables.
 *
 * @packageDocumentation
 */
declare type ContextDefault = {
    [k: string]: any;
};
declare class Context<T extends ContextDefault> {
    _is_production: boolean;
    name?: string | undefined;
    context: T;
    constructor(_default: T, _is_production: boolean, name?: string | undefined);
    set(_overwrite: Partial<T>): T;
    get<k extends string>(key: k): T[k];
    get_all(): T;
    set_env(): void;
    /**
     * Do not check if the key paramter is a valid one.
     *
     * @param key: any key
     */
    get_any(key: any): any;
    private _get;
    private _get_env_vars;
}
export declare function create<T extends ContextDefault>(_default: T, _is_production: boolean, name?: string): Context<T>;
export {};
