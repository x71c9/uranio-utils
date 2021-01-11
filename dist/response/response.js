"use strict";
/**
 * Response module for Response
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_false = exports.is_true = exports.is_fail = exports.is_success = exports.is_response = void 0;
/**
 * Return true if the response is a General response
 *
 * @param response - a possible response
 */
function is_response(response) {
    if (typeof response !== 'object' || response === null)
        return false;
    return ('success' in response && 'status' in response);
}
exports.is_response = is_response;
/**
 * Return true if the response is a Success
 *
 * @param response - a Response
 */
function is_success(response) {
    return response.success;
}
exports.is_success = is_success;
/**
 * Return true if the response is a Fail
 *
 * @param response - a Response
 */
function is_fail(response) {
    return !response.success;
}
exports.is_fail = is_fail;
/**
 * Return true if the response is a Boolean<true>
 *
 * @param response - a Response
 */
function is_true(response) {
    return response.success;
}
exports.is_true = is_true;
/**
 * Return true if the response is a Boolean<false>
 *
 * @param response - a Response
 */
function is_false(response) {
    return !response.success;
}
exports.is_false = is_false;
//# sourceMappingURL=response.js.map