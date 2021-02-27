"use strict";
/**
 * Util module for log module
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorators = exports.return_injector = void 0;
const dateformat_1 = __importDefault(require("dateformat"));
const formatter_1 = require("../util/formatter");
var console_injectors_1 = require("./console_injectors");
Object.defineProperty(exports, "console_injectors", { enumerable: true, get: function () { return console_injectors_1.console_injectors; } });
const log_1 = require("./log");
const log_defaults_1 = __importDefault(require("./log.defaults"));
/**
 * Method for creating an injectable object
 *
 * This object can be used in "return" module.
 */
exports.return_injector = {
    success_handler: (p) => {
        log_1.debug(p);
        return p;
    },
    fail_handler: (p) => {
        log_1.error(p);
        return p;
    }
};
var decorators;
(function (decorators) {
    /**
     * Class @decorator function for loggin constructor with arguments
     *
     * @param log_instance - the log instance that will be used for logging
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    function debug_constructor(constr_func) {
        const ExtClass = class extends constr_func {
            constructor(...args) {
                fn_debug_constructor(random_id(), constr_func.name, format_args(args, log_defaults_1.default.max_str_length));
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
    decorators.debug_constructor = debug_constructor;
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
            if (typeof descriptor.no_debug === undefined)
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
    decorators.debug_methods = debug_methods;
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    function no_debug(_1, _2, descriptor) {
        descriptor.no_debug = true;
    }
    decorators.no_debug = no_debug;
})(decorators = exports.decorators || (exports.decorators = {}));
/**
 * Generate random id
 */
function random_id() {
    const milliseconds = dateformat_1.default(new Date(), 'l');
    return (Math.floor(Math.random() * 100) + '' + milliseconds).padStart(5, '0');
}
/**
 * Debug constructor with arguments
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param constructor_name - The constructor name.
 * @param str_args - A string containing the arguments.
 */
function fn_debug_constructor(rand_id, constructor_name, str_args) {
    log_1.fn_debug(`[${rand_id}] new ${constructor_name}(${str_args})`);
}
/**
 * Debug private constructor with arguments
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param constructor_name - The constructor name.
 * @param str_args - A string containing the arguments.
 */
// function fn_debug_private_constructor(rand_id:string, constructor_name:string, str_args:string)
//     :void{
//   fn_debug(`[${rand_id}] private ${constructor_name}(${str_args})`);
// }
/**
 * Debug a method with arguments
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param target_name - The name of the class being called.
 * @param method - The name of the method being called.
 * @param str_args - A string containing the arguments.
 */
function fn_debug_method_with_args(rand_id, target_name, method, str_args) {
    log_1.fn_debug(`[${rand_id}] ${target_name}.${method}(${str_args})`);
}
/**
 * Debug a response of a method
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param target_name - The name of the class being called.
 * @param method - The name of the method being called.
 * @param str_result - The result of the method as string.
 * @param is_promise - A boolean value, true if the method return a Promise.
 */
function fn_debug_method_response(rand_id, target_name, method, str_result, is_promise = false) {
    const promise_str = (is_promise) ? ' [Promise]' : '';
    log_1.fn_debug(`[${rand_id}] [R]${promise_str} ${target_name}.${method}:`, `${str_result}`);
}
/**
 * Debug a response method error
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param target_name - The name of the class being called.
 * @param method - The name of the method being called.
 * @param error - The error to log.
 */
function fn_debug_method_response_error(rand_id, target_name, method, err) {
    log_1.fn_debug(`[${rand_id}] [R] ${target_name}.${method}: ERROR`);
    log_1.error(err);
}
/**
 * Format arguments
 *
 * @param args - Array of paramter to format.
 * @param max_str_length - Max string length for formatted arguments.
 */
function format_args(args, max_str_length) {
    let str_args = (args.length > 0) ? `${args}` : '';
    try {
        str_args = (args.length > 0) ? formatter_1.json_one_line(args) : '';
        str_args = str_args.substr(1, str_args.length - 2);
    }
    catch (e) {
        str_args = `[CANNOT FORMAT ARGUMENTS][${e.message}]`;
    }
    if (typeof str_args == 'string' && str_args.length > max_str_length)
        str_args = str_args.substr(0, max_str_length) + '...';
    return str_args;
}
/**
 * Format response into string for debugging
 *
 * @param result - The result to log.
 * @param max_str_length - Max string length for formatted result.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function format_result(result, max_str_length) {
    let str_result = `${result}`;
    try {
        str_result = `${result}`;
        str_result = formatter_1.json_one_line(result);
    }
    catch (e) {
        str_result = `[CANNOT FORMAT RESULT][${e.message}]`;
    }
    if (typeof str_result == 'string' && str_result.length > max_str_length)
        str_result = str_result.substr(0, max_str_length) + '...';
    return str_result;
}
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
        const rand_id = random_id();
        const target_name = (appendix != '') ? appendix + ' ' + target.name : target.name;
        fn_debug_method_with_args(rand_id, target_name, property_name, format_args(args, log_defaults_1.default.max_str_length));
        try {
            const result = original_method.apply(this, args);
            fn_debug_method_response(rand_id, target_name, property_name, format_result(result, log_defaults_1.default.max_str_length));
            if (result instanceof Promise) {
                result.then((data) => {
                    fn_debug_method_response(rand_id, target_name, property_name, format_result(data, log_defaults_1.default.max_str_length), true);
                }).catch((err) => {
                    fn_debug_method_response_error(rand_id, target_name, property_name, err);
                });
            }
            return result;
        }
        catch (err) {
            fn_debug_method_response_error(rand_id, target_name, property_name, err);
            throw err;
        }
    };
}
//# sourceMappingURL=util.js.map