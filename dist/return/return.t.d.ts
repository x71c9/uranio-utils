export declare namespace URNResponse {
    interface AbstractResponse<T = null> {
        status: number;
        success: boolean;
        payload: T;
        message?: string;
        ex?: any | null;
    }
    /**
     * URANIO Response interface for success
     */
    export interface Success<T = null> extends AbstractResponse<T> {
        status: 200;
        success: true;
        payload: T;
        message?: string;
    }
    /**
     * URANIO Response interface for failure
     */
    export interface Fail<T = null> extends AbstractResponse<T> {
        status: number;
        success: false;
        payload: T;
        message?: string;
        ex?: Error | null;
    }
    export type Response<T = null, K = null> = Success<T> | Fail<K>;
    export interface UBoolean<T extends boolean = boolean> {
        success: T;
        message?: string;
    }
    export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
    /**
     * Return true if the response is a Response
     *
     * @param response - a possible Response
     */
    export function isResponse<T, Q>(response: Response<T, Q>): response is Response<T, Q>;
    /**
     * Return true if the response is a Success
     *
     * @param response - a Response
     */
    export function isSuccess<T, Q>(response: Response<T, Q>): response is Success<T>;
    /**
     * Return true if the response is a Fail
     *
     * @param response - a Response
     */
    export function isFail<T, Q>(response: Response<T, Q>): response is Fail<Q>;
    /**
     * Return true if the response is a Boolean<true>
     *
     * @param response - a Response
     */
    export function isTrue(response: UBoolean<any>): response is UBoolean<true>;
    /**
     * Return true if the response is a Boolean<false>
     *
     * @param response - a Response
     */
    export function isFalse(response: UBoolean<any>): response is UBoolean<false>;
    export {};
}
