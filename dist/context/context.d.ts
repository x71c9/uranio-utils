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
    context: T;
    constructor(_default: T, _is_production: boolean);
    set(_overwrite: Partial<T>): T;
    get<k extends string>(key: k): T[k];
}
export declare function init<T>(_default: T, _is_production: boolean): Context<T>;
export {};
