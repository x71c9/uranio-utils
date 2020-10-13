/**
 * Module for logging
 *
 * @packageDocumentation
 */
import log_defaults from './log.defaults';
export { URNLogLevel as LogLevel } from './log.t';
export { log_defaults as config };
import { URNResponseInjectable } from '../util/response_injectable.t';
/**
 * Debug functions log
 *
 * @param ...params - variables to log
 */
export declare function fndebug(...params: any[]): void;
/**
 * Debug log
 *
 * @param ...params - variables to log
 */
export declare function debug(...params: any[]): void;
/**
 * Normal log
 *
 * @param ...params - variables to log
 */
export declare function log(...params: any[]): void;
/**
 * Warning log
 *
 * @param ...params - variables to log
 */
export declare function warn(...params: any[]): void;
/**
 * Error log
 *
 * @param ...params - variables to log
 */
export declare function error(...params: any[]): void;
/**
 * Generate random id
 */
export declare function randId(): string;
/**
 * Debug constructor with arguments
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param constructor_name - The constructor name.
 * @param str_args - A string containing the arguments.
 */
export declare function fndebugCostructor(rand_id: string, constructor_name: string, str_args: string): void;
/**
 * Debug private constructor with arguments
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param constructor_name - The constructor name.
 * @param str_args - A string containing the arguments.
 */
export declare function fndebugPrivateCostructor(rand_id: string, constructor_name: string, str_args: string): void;
/**
 * Debug a method with arguments
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param target_name - The name of the class being called.
 * @param method - The name of the method being called.
 * @param str_args - A string containing the arguments.
 */
export declare function fndebugMethodWithArgs(rand_id: string, target_name: string, method: string, str_args: string): void;
/**
 * Debug a response of a method
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param target_name - The name of the class being called.
 * @param method - The name of the method being called.
 * @param str_result - The result of the method as string.
 * @param is_promise - A boolean value, true if the method return a Promise.
 */
export declare function fndebugMethodResponse(rand_id: string, target_name: string, method: string, str_result: string, is_promise?: boolean): void;
/**
 * Debug a response method error
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param target_name - The name of the class being called.
 * @param method - The name of the method being called.
 * @param error - The error to log.
 */
export declare function fndebugMethodResponseError(rand_id: string, target_name: string, method: string, error: Error): void;
/**
 * Format arguments
 *
 * @param args - Array of paramter to format.
 * @param max_str_length - Max string length for formatted arguments.
 */
export declare function formatArgs(args: any[], max_str_length: number): string;
/**
 * Format response into string for debugging
 *
 * @param result - The result to log.
 * @param max_str_length - Max string length for formatted result.
 */
export declare function formatResult(result: any, max_str_length: number): string;
/**
 * Class @decorator function for loggin constructor with arguments
 * The function will actually return a decorator function.
 *
 * @param log_instance - the log instance that will be used for logging
 */
export declare function debug_constructor<T extends {
    new (...constr_args: any[]): any;
}>(constr_func: T): {
    new (...a: any[]): any;
};
/**
 * Class @decorator function for logging each method inside the class
 *
 * The function return a decorator function.
 *
 * @param target - the class itself (check Decorator documentation)
 */
export declare function debug_methods(target: Function): void;
/**
 * Method for creating an injectable object
 *
 * This object can be used in "return" module.
 */
export declare const response_injector: URNResponseInjectable;
