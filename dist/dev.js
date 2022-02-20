"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
// urn_log.init(urn_log.LogLevel.FUNCTION_DEBUG);
index_1.urn_log.init({
    log_level: index_1.urn_log.LogLevel.FUNCTION_DEBUG,
    debug_info: false,
    prefix_type: true,
    color: true
});
index_1.urn_log.warn(`Hello`);
index_1.urn_log.warn(`Hello`);
index_1.urn_log.fn_debug(`Hello`);
index_1.urn_log.fn_debug(`Hello`);
index_1.urn_log.error(`Hello`);
index_1.urn_log.error(`Hello`);
index_1.urn_log.debug(`Hello`);
index_1.urn_log.debug(`Hello`);
index_1.urn_log.warn(`Hello`);
//# sourceMappingURL=dev.js.map