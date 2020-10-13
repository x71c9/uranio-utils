"use strict";
/**
 * Module for logging
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.response_injector = exports.debug_methods = exports.debug_constructor = exports.formatResult = exports.formatArgs = exports.fndebugMethodResponseError = exports.fndebugMethodResponse = exports.fndebugMethodWithArgs = exports.fndebugPrivateCostructor = exports.fndebugCostructor = exports.randId = exports.error = exports.warn = exports.log = exports.debug = exports.fndebug = exports.config = void 0;
/*
 * Import dateformat module
 */
const dateformat_1 = __importDefault(require("dateformat"));
/*
 * Import jsonOneLine formatter
 */
const formatter_1 = require("../util/formatter");
/*
 * Import log configuration file
 */
const log_defaults_1 = __importDefault(require("./log.defaults"));
exports.config = log_defaults_1.default;
/**
 * Function that will check the type and run the corresponding injector method
 *
 * @param type - the injector method type, same as URNLogType.
 * @param ...params - parameters to log.
 */
function _run_injector(type, ...params) {
    if (!Array.isArray(log_defaults_1.default.injectors) || log_defaults_1.default.injectors.length == 0)
        return;
    for (const injector of log_defaults_1.default.injectors) {
        switch (type) {
            case 'error':
                if (typeof injector.error_inject === 'function')
                    injector.error_inject(...params);
                break;
            case 'warn':
                if (typeof injector.warn_inject === 'function')
                    injector.warn_inject(...params);
                break;
            case 'log':
                if (typeof injector.log_inject === 'function')
                    injector.log_inject(...params);
                break;
            case 'debug':
                if (typeof injector.debug_inject === 'function')
                    injector.debug_inject(...params);
                break;
            case 'fndebug':
                if (typeof injector.fndebug_inject === 'function')
                    injector.fndebug_inject(...params);
                break;
        }
    }
}
/**
 * Debug functions log
 *
 * @param ...params - variables to log
 */
function fndebug(...params) {
    if (log_defaults_1.default.log_level > 4) {
        _run_injector('fndebug', ...params);
    }
}
exports.fndebug = fndebug;
/**
 * Debug log
 *
 * @param ...params - variables to log
 */
function debug(...params) {
    if (log_defaults_1.default.log_level > 3) {
        _run_injector('debug', ...params);
    }
}
exports.debug = debug;
/**
 * Normal log
 *
 * @param ...params - variables to log
 */
function log(...params) {
    if (log_defaults_1.default.log_level > 2) {
        _run_injector('log', ...params);
    }
}
exports.log = log;
/**
 * Warning log
 *
 * @param ...params - variables to log
 */
function warn(...params) {
    if (log_defaults_1.default.log_level > 1) {
        _run_injector('warn', ...params);
    }
}
exports.warn = warn;
/**
 * Error log
 *
 * @param ...params - variables to log
 */
function error(...params) {
    if (log_defaults_1.default.log_level > 0) {
        _run_injector('error', ...params);
    }
}
exports.error = error;
/**
 * Generate random id
 */
function randId() {
    const milliseconds = dateformat_1.default(new Date(), 'l');
    return (Math.floor(Math.random() * 100) + '' + milliseconds).padStart(5, '0');
}
exports.randId = randId;
/**
 * Debug constructor with arguments
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param constructor_name - The constructor name.
 * @param str_args - A string containing the arguments.
 */
function fndebugCostructor(rand_id, constructor_name, str_args) {
    fndebug(`[${rand_id}] new ${constructor_name}(${str_args})`);
}
exports.fndebugCostructor = fndebugCostructor;
/**
 * Debug private constructor with arguments
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param constructor_name - The constructor name.
 * @param str_args - A string containing the arguments.
 */
function fndebugPrivateCostructor(rand_id, constructor_name, str_args) {
    fndebug(`[${rand_id}] private ${constructor_name}(${str_args})`);
}
exports.fndebugPrivateCostructor = fndebugPrivateCostructor;
/**
 * Debug a method with arguments
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param target_name - The name of the class being called.
 * @param method - The name of the method being called.
 * @param str_args - A string containing the arguments.
 */
function fndebugMethodWithArgs(rand_id, target_name, method, str_args) {
    fndebug(`[${rand_id}] ${target_name}.${method}(${str_args})`);
}
exports.fndebugMethodWithArgs = fndebugMethodWithArgs;
/**
 * Debug a response of a method
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param target_name - The name of the class being called.
 * @param method - The name of the method being called.
 * @param str_result - The result of the method as string.
 * @param is_promise - A boolean value, true if the method return a Promise.
 */
function fndebugMethodResponse(rand_id, target_name, method, str_result, is_promise = false) {
    const promise_str = (is_promise) ? ' [Promise]' : '';
    fndebug(`[${rand_id}] [R]${promise_str} ${target_name}.${method}:`, `${str_result}`);
}
exports.fndebugMethodResponse = fndebugMethodResponse;
/**
 * Debug a response method error
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param target_name - The name of the class being called.
 * @param method - The name of the method being called.
 * @param error - The error to log.
 */
function fndebugMethodResponseError(rand_id, target_name, method, error) {
    fndebug(`[${rand_id}] [R] ${target_name}.${method}: ERROR`);
    fndebug(error);
}
exports.fndebugMethodResponseError = fndebugMethodResponseError;
/**
 * Format arguments
 *
 * @param args - Array of paramter to format.
 * @param max_str_length - Max string length for formatted arguments.
 */
function formatArgs(args, max_str_length) {
    let str_args = (args.length > 0) ? `${args}` : '';
    try {
        str_args = (args.length > 0) ? formatter_1.jsonOneLine(args) : '';
        str_args = str_args.substr(1, str_args.length - 2);
    }
    catch (e) {
        str_args = `[CANNOT FORMAT ARGUMENTS][${e.message}]`;
    }
    if (typeof str_args == 'string' && str_args.length > max_str_length)
        str_args = str_args.substr(0, max_str_length) + '...';
    return str_args;
}
exports.formatArgs = formatArgs;
/**
 * Format response into string for debugging
 *
 * @param result - The result to log.
 * @param max_str_length - Max string length for formatted result.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function formatResult(result, max_str_length) {
    let str_result = `${result}`;
    try {
        str_result = `${result}`;
        str_result = formatter_1.jsonOneLine(result);
    }
    catch (e) {
        str_result = `[CANNOT FORMAT RESULT][${e.message}]`;
    }
    if (typeof str_result == 'string' && str_result.length > max_str_length)
        str_result = str_result.substr(0, max_str_length) + '...';
    return str_result;
}
exports.formatResult = formatResult;
/**
 * Class @decorator function for loggin constructor with arguments
 * The function will actually return a decorator function.
 *
 * @param log_instance - the log instance that will be used for logging
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function debug_constructor(constr_func) {
    const ExtClass = class extends constr_func {
        constructor(...args) {
            fndebugCostructor(randId(), constr_func.name, formatArgs(args, log_defaults_1.default.max_str_length));
            super(...args);
        }
    };
    for (const property_name of Object.getOwnPropertyNames(constr_func)) {
        const descriptor = Object.getOwnPropertyDescriptor(constr_func, property_name);
        if (property_name != 'prototype')
            Object.defineProperty(ExtClass, property_name, descriptor);
    }
    return ExtClass;
}
exports.debug_constructor = debug_constructor;
/**
 * Helper function that replace method with a new function that logs before and after
 * Used in the decorator function debug_method
 *
 * @param target - the class
 * @param descriptor - the method descriptor
 * @param property_name - the method name
 * @param appendix - a string to add before the name of the property logged
 */
function replace_method_with_logs(target, descriptor, property_name, appendix = '') {
    const original_method = descriptor.value;
    descriptor.value = function (...args) {
        const rand_id = randId();
        const target_name = (appendix != '') ? appendix + ' ' + target.name : target.name;
        fndebugMethodWithArgs(rand_id, target_name, property_name, formatArgs(args, log_defaults_1.default.max_str_length));
        const result = original_method.apply(this, args);
        fndebugMethodResponse(rand_id, target_name, property_name, formatResult(result, log_defaults_1.default.max_str_length));
        if (result instanceof Promise) {
            result.then((data) => {
                fndebugMethodResponse(rand_id, target_name, property_name, formatResult(data, log_defaults_1.default.max_str_length), true);
            }).catch((err) => {
                fndebugMethodResponseError(rand_id, target_name, property_name, err);
            });
        }
        return result;
    };
}
/**
 * Class @decorator function for logging each method inside the class
 *
 * The function return a decorator function.
 *
 * @param target - the class itself (check Decorator documentation)
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function debug_methods(target) {
    //constructor methods
    for (const property_name of Object.getOwnPropertyNames(target.prototype)) {
        const descriptor = Object.getOwnPropertyDescriptor(target.prototype, property_name);
        if (!(descriptor.value instanceof Function) || property_name == 'constructor')
            continue;
        replace_method_with_logs(target, descriptor, property_name);
        Object.defineProperty(target.prototype, property_name, descriptor);
    }
    //static methods
    for (const property_name of Object.getOwnPropertyNames(target)) {
        const descriptor = Object.getOwnPropertyDescriptor(target, property_name);
        if (!(descriptor.value instanceof Function) || property_name == 'constructor')
            continue;
        replace_method_with_logs(target, descriptor, property_name, '[static]');
        Object.defineProperty(target, property_name, descriptor);
    }
}
exports.debug_methods = debug_methods;
/**
 * Method for creating an injectable object
 *
 * This object can be used in "return" module.
 */
exports.response_injector = {
    success_handler: (p) => {
        log(p);
        return p;
    },
    fail_handler: (p) => {
        error(p);
        return p;
    }
};
//# sourceMappingURL=log.js.map