/**
 * Response module for Response
 *
 * @packageDocumentation
 */

import {URNResponse, Success, Fail, UBoolean} from './types';

/**
 * Return true if the response is a URNResponse
 *
 * @param response - a possible URNResponse
 */
export function isResponse<T,Q>(response:unknown): response is URNResponse<T,Q> {
	if(typeof response !== 'object' || response === null)
		return false;
	return ('success' in response && 'status' in response);
}

/**
 * Return true if the response is a Success
 *
 * @param response - a URNResponse
 */
export function isSuccess<T,Q>(response:URNResponse<T,Q>): response is Success<T> {
	return response.success;
}

/**
 * Return true if the response is a Fail
 *
 * @param response - a URNResponse
 */
export function isFail<T,Q>(response:URNResponse<T,Q>): response is Fail<Q> {
	return !response.success;
}

/**
 * Return true if the response is a Boolean<true>
 *
 * @param response - a URNResponse
 */
export function isTrue(response:UBoolean<any>): response is UBoolean<true> {
	return response.success;
}

/**
 * Return true if the response is a Boolean<false>
 *
 * @param response - a URNResponse
 */
export function isFalse(response:UBoolean<any>): response is UBoolean<false> {
	return !response.success;
}
