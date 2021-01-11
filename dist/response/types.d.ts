/**
 * Export module type for URNResponse
 *
 * @packageDocumentation
 */
interface AbstractResponse<T = null> {
    status: number;
    success: boolean;
    payload: T;
    message?: string;
    ex?: any | null;
}
/**
 * URNResponse interface for success
 */
export interface Success<T = null> extends AbstractResponse<T> {
    status: 200;
    success: true;
    payload: T;
    message?: string;
}
/**
 * URNResponse interface for failure
 */
export interface Fail<T = null> extends AbstractResponse<T> {
    status: number;
    success: false;
    payload: T;
    message?: string;
    ex?: Error | null;
}
export declare type General<T = null, K = null> = Success<T> | Fail<K>;
export interface UBoolean<T extends boolean = boolean> {
    success: T;
    message?: string;
}
export {};
