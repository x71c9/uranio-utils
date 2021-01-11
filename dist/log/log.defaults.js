"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Import console injectors
 */
// import {terminal_log_injector, browser_log_injector} from './console_injectors';
/*
 * Select default injector, check if is node or browser
 */
// const log_injector = (typeof process === undefined) ?
// browser_log_injector : terminal_log_injector;
/*
 * Instanciate Log default object
 */
const log_defaults = {
    log_level: 1 /* ERROR */,
    time_format: "yyyy-mm-dd'T'HH:MM:ss:l",
    max_str_length: 174,
    context: 'terminal',
    injectors: []
};
exports.default = log_defaults;
//# sourceMappingURL=log.defaults.js.map