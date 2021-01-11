/**
 * Module for logging
 *
 * @packageDocumentation
 */
import log_defaults from './log.defaults';
export { log_defaults as defaults };
import { ReturnInjectable } from '../return/types';
/**
 * Debug functions log
 *
 * @param ...params - variables to log
 */
export declare function fn_debug(...params: any[]): void;
/**
 * Debug log
 *
 * @param ...params - variables to log
 */
export declare function debug(...params: any[]): void;
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
export declare namespace decorators {
    /**
     * Class @decorator function for loggin constructor with arguments
     *
     * @param log_instance - the log instance that will be used for logging
     */
    function debug_constructor<T extends {
        new (...constr_args: any[]): any;
    }>(constr_func: T): {
        new (...args: any[]): {
            [x: string]: any;
        };
    } & T;
    /**
     * Class @decorator function for logging each method inside the class
     *
     * The function return a decorator function.
     *
     * @param target - the class itself (check Decorator documentation)
     */
    function debug_methods(target: Function): void;
    function no_debug(_1: any, _2: string, descriptor: PropertyDescriptor): void;
}
/**
 * Method for creating an injectable object
 *
 * This object can be used in "return" module.
 */
export declare const return_injector: ReturnInjectable;
