"use strict";
/**
 * Module for URANIO Exception
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const types_1 = require("./types");
class URNException extends Error {
    constructor(module_code, module_name, error_code, msg, nested) {
        super();
        this.module_code = module_code;
        this.module_name = module_name;
        this.error_code = error_code;
        this.msg = msg;
        this.nested = nested;
        this.name = 'URANIOException';
        this.type = types_1.ExceptionType.GENERAL;
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
        this.type = types_1.ExceptionType.NOT_FOUND;
    }
}
class URNAuthNotFoundException extends URNNotFoundException {
    constructor() {
        super(...arguments);
        this.name = 'URANIOAuthNotFoundException';
        this.type = types_1.ExceptionType.AUTH_NOT_FOUND;
    }
}
class URNInvalidAtomException extends URNException {
    constructor(module_code, module_name, error_code, msg, object, keys, nested) {
        super(module_code, module_name, error_code, msg, nested);
        this.object = object;
        this.keys = keys;
        this.name = 'URANIOInvalidAtomException';
        this.type = types_1.ExceptionType.INVALID_ATOM;
    }
}
class URNUnauthorizedException extends URNException {
    constructor() {
        super(...arguments);
        this.name = 'URANIOUnauthorizedException';
        this.type = types_1.ExceptionType.UNAUTHORIZED;
    }
}
class URNInvalidRequestException extends URNException {
    constructor() {
        super(...arguments);
        this.name = 'URANIOInvalidRequestException';
        this.type = types_1.ExceptionType.INVALID_REQUEST;
    }
}
class URNAuthInvalidPasswordException extends URNInvalidRequestException {
    constructor() {
        super(...arguments);
        this.name = 'URANIOAuthInvalidPasswordException';
        this.type = types_1.ExceptionType.AUTH_INVALID_PASSWORD;
    }
}
class URNNotInitializedException extends URNException {
    constructor() {
        super(...arguments);
        this.name = 'URANIONotInitializedException';
        this.type = types_1.ExceptionType.NOT_INITIALIZED;
    }
}
class URNInvalidBookException extends URNException {
    constructor() {
        super(...arguments);
        this.name = 'URANIOInvalidBookException';
        this.type = types_1.ExceptionType.INVALID_BOOK;
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
        create_auth_not_found: function (err_code, msg, nested) {
            return new URNAuthNotFoundException(module_code, module_name, err_code, msg, nested);
        },
        create_invalid_atom: function (err_code, msg, object, keys, nested) {
            return new URNInvalidAtomException(module_code, module_name, err_code, msg, object, keys, nested);
        },
        create_unauthorized: function (err_code, msg, nested) {
            return new URNUnauthorizedException(module_code, module_name, err_code, msg, nested);
        },
        create_invalid_request: function (err_code, msg, nested) {
            return new URNInvalidRequestException(module_code, module_name, err_code, msg, nested);
        },
        create_auth_invalid_password: function (err_code, msg, nested) {
            return new URNAuthInvalidPasswordException(module_code, module_name, err_code, msg, nested);
        },
        create_not_initialized: function (err_code, msg, nested) {
            return new URNNotInitializedException(module_code, module_name, err_code, msg, nested);
        },
        create_invalid_book: function (err_code, msg, nested) {
            return new URNInvalidBookException(module_code, module_name, err_code, msg, nested);
        }
    };
}
exports.init = init;
//# sourceMappingURL=exception.js.map