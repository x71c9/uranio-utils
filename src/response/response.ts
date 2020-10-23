/**
 * Response module for Response
 *
 * @packageDocumentation
 */

import {General, Success, Fail, UBoolean} from './types';

/**
 * Return true if the response is a General response
 *
 * @param response - a possible response
 */
export function is_response<T,Q>(response:unknown): response is General<T,Q> {
	if(typeof response !== 'object' || response === null)
		return false;
	return ('success' in response && 'status' in response);
}

/**
 * Return true if the response is a Success
 *
 * @param response - a Response
 */
export function is_success<T,Q>(response:General<T,Q>): response is Success<T> {
	return response.success;
}

/**
 * Return true if the response is a Fail
 *
 * @param response - a Response
 */
export function is_fail<T,Q>(response:General<T,Q>): response is Fail<Q> {
	return !response.success;
}

/**
 * Return true if the response is a Boolean<true>
 *
 * @param response - a Response
 */
export function is_true(response:UBoolean<any>): response is UBoolean<true> {
	return response.success;
}

/**
 * Return true if the response is a Boolean<false>
 *
 * @param response - a Response
 */
export function is_false(response:UBoolean<any>): response is UBoolean<false> {
	return !response.success;
}
