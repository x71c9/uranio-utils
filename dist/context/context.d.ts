/**
 * Context module
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
    private _get_env_vars;
}
export declare function create<T>(_default: T, _is_production: boolean, name?: string): Context<T>;
export {};
