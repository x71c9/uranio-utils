"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
// urn_log.init(urn_log.LogLevel.FUNCTION_DEBUG);
index_1.urn_log.init({
    level: index_1.urn_log.LogLevel.FUNCTION_DEBUG,
    debug_info: false
});
index_1.urn_log.warn(`Hello`);
index_1.urn_log.warn(`Hello`);
//# sourceMappingURL=dev.js.map