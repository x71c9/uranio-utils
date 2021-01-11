/**
 * Response module for Response
 *
 * @packageDocumentation
 */
import { General, Success, Fail, UBoolean } from './types';
/**
 * Return true if the response is a General response
 *
 * @param response - a possible response
 */
export declare function is_response<T, Q>(response: unknown): response is General<T, Q>;
/**
 * Return true if the response is a Success
 *
 * @param response - a Response
 */
export declare function is_success<T, Q>(response: General<T, Q>): response is Success<T>;
/**
 * Return true if the response is a Fail
 *
 * @param response - a Response
 */
export declare function is_fail<T, Q>(response: General<T, Q>): response is Fail<Q>;
/**
 * Return true if the response is a Boolean<true>
 *
 * @param response - a Response
 */
export declare function is_true(response: UBoolean<any>): response is UBoolean<true>;
/**
 * Return true if the response is a Boolean<false>
 *
 * @param response - a Response
 */
export declare function is_false(response: UBoolean<any>): response is UBoolean<false>;
