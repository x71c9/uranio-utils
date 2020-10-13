"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_injector_1 = require("../log/console_injector");
const log_injector = (typeof process === undefined) ?
    console_injector_1.browser_log_injector : console_injector_1.terminal_log_injector;
const log_defaults = {
    log_level: 1 /* ERROR */,
    time_format: "yyyy-mm-dd'T'HH:MM:ss:l",
    max_str_length: 174,
    context: 'terminal',
    injectors: [log_injector]
};
exports.default = log_defaults;
//# sourceMappingURL=log.defaults.js.map