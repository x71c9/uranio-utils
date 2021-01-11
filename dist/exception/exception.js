"use strict";
/**
 * Module for URANIO Exception
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
class URNException extends Error {
    constructor(module_code, module_name, error_code, msg, nested) {
        super();
        this.module_code = module_code;
        this.module_name = module_name;
        this.error_code = error_code;
        this.msg = msg;
        this.nested = nested;
        this.name = 'URANIOException';
        this.type = "GENERAL" /* GENERAL */;
        this.message = `[${module_code}_${error_code}]`;
        this.message += ` ${module_name}. ${msg}`;
        if (nested && nested.message)
            this.message += ` ${nested.message}`;
        const actual_prototype = new.target.prototype;
        Object.setPrototypeOf(this, actual_prototype);
        this.date = new Date();
    }
}
class URNNotFoundException extends URNException {
    constructor() {
        super(...arguments);
        this.name = 'URANIONotFoundException';
        this.type = "NOTFOUND" /* NOT_FOUND */;
    }
}
class URNInvalidException extends URNException {
    constructor(module_code, module_name, error_code, msg, object, keys, nested) {
        super(module_code, module_name, error_code, msg, nested);
        this.object = object;
        this.keys = keys;
        this.name = 'URANIOInvalidException';
        this.type = "INVALID" /* INVALID */;
    }
}
class URNUnauthorizedException extends URNException {
    constructor() {
        super(...arguments);
        this.name = 'URANIOUnauthorizedException';
        this.type = "UNAUTHORIZED" /* UNAUTHORIZED */;
    }
}
function init(module_code, module_name) {
    return {
        create: function (err_code, msg, nested) {
            return new URNException(module_code, module_name, err_code, msg, nested);
        },
        create_not_found: function (err_code, msg, nested) {
            return new URNNotFoundException(module_code, module_name, err_code, msg, nested);
        },
        create_invalid: function (err_code, msg, object, keys, nested) {
            return new URNInvalidException(module_code, module_name, err_code, msg, object, keys, nested);
        },
        create_unauthorized: function (err_code, msg, nested) {
            return new URNUnauthorizedException(module_code, module_name, err_code, msg, nested);
        }
    };
}
exports.init = init;
//# sourceMappingURL=exception.js.map