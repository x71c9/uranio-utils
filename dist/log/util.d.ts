/**
 * Util module for log module
 *
 * @packageDocumentation
 */
import { ReturnInjectable } from '../return/types';
export { console_injectors } from './console_injectors';
/**
 * Method for creating an injectable object
 *
 * This object can be used in "return" module.
 */
export declare const return_injector: ReturnInjectable;
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
