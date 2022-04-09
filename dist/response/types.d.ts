/**
 * Export module type for URNResponse
 *
 * @packageDocumentation
 */
interface AbstractResponse<T = null, M = any> {
    status: number;
    success: boolean;
    payload: T;
    meta?: M;
    message?: string;
    ex?: any | null;
}
/**
 * URNResponse interface for success
 */
export interface Success<T = null, M = any> extends AbstractResponse<T, M> {
    status: 200;
    success: true;
    payload: T;
    meta?: M;
    message?: string;
}
/**
 * URNResponse interface for failure
 */
export interface Fail<T = null, M = any> extends AbstractResponse<T, M> {
    status: number;
    success: false;
    payload: T;
    meta?: M;
    message?: string;
    err_code: string;
    err_msg: string;
    ex?: Error | null;
}
export declare type General<T = null, K = null, M = any> = Success<T, M> | Fail<K, M>;
export interface UBoolean<T extends boolean = boolean, M = any> {
    success: T;
    meta?: M;
    message?: string;
}
export {};
