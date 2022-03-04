"use strict";
/*
 * Merging all under a namespace called urn_lib
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urn_lib = exports.urn_exception = exports.urn_util = exports.urn_return = exports.urn_response = exports.urn_log = void 0;
const urn_log = __importStar(require("./log/"));
exports.urn_log = urn_log;
const urn_response = __importStar(require("./response/"));
exports.urn_response = urn_response;
const urn_return = __importStar(require("./return/"));
exports.urn_return = urn_return;
const urn_util = __importStar(require("./util/"));
exports.urn_util = urn_util;
const urn_exception = __importStar(require("./exception/"));
exports.urn_exception = urn_exception;
var urn_lib;
(function (urn_lib) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    urn_lib.log = urn_log;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    urn_lib.response = urn_response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    urn_lib.ureturn = urn_return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    urn_lib.util = urn_util;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    urn_lib.exception = urn_exception;
})(urn_lib = exports.urn_lib || (exports.urn_lib = {}));
//# sourceMappingURL=main.js.map