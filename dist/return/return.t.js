"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URNResponse = void 0;
var URNResponse;
(function (URNResponse) {
    /**
     * Return true if the response is a Response
     *
     * @param response - a possible Response
     */
    function isResponse(response) {
        return (typeof response.success !== undefined && typeof response.status !== undefined);
    }
    URNResponse.isResponse = isResponse;
    /**
     * Return true if the response is a Success
     *
     * @param response - a Response
     */
    function isSuccess(response) {
        return response.success;
    }
    URNResponse.isSuccess = isSuccess;
    /**
     * Return true if the response is a Fail
     *
     * @param response - a Response
     */
    function isFail(response) {
        return !response.success;
    }
    URNResponse.isFail = isFail;
    /**
     * Return true if the response is a Boolean<true>
     *
     * @param response - a Response
     */
    function isTrue(response) {
        return response.success;
    }
    URNResponse.isTrue = isTrue;
    /**
     * Return true if the response is a Boolean<false>
     *
     * @param response - a Response
     */
    function isFalse(response) {
        return !response.success;
    }
    URNResponse.isFalse = isFalse;
})(URNResponse = exports.URNResponse || (exports.URNResponse = {}));
//# sourceMappingURL=return.t.js.map