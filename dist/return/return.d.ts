/**
 * Middleware module for formatting responses
 *
 * @packageDocumentation
 */
import { General, Success, Fail, UBoolean } from '../response/index';
import { ReturnInjectable } from './types';
/**
 * Class URNReturn has all the methods for creating Response objects.
 * Its constructor accepts an array of ReturnInjectable objects.
 * This type of objects must have two functions:
 * `success_handler` and `fail_handler`.
 * These methods will be injected in the response as middleware.
 *
 * Async handlers are not managed for now.
 * Most common case is for logging.
 *
 * The class is designed so that each module that imports it
 * should have its own instance and its own injectable objects.
 */
declare class URNReturn {
    /**
     * An array of injectable objects.
     */
    inject_objects: ReturnInjectable[];
    /**
     * Constructor function
     *
     * @param inject_objects - will set the array of injectable objects
     */
    constructor(inject_objects?: ReturnInjectable | ReturnInjectable[]);
    /**
     * Method for checking if the injectable object has the methods needed
     * and for pushing it to the inject_objects array.
     *
     * @param inject_object - the object to check and add
     *
     */
    private _add_inject;
    /**
     * Method that accept one or an array of injectable objects and
     * add it/them to the injcet_objects array
     *
     * @param inject_objects - the object/s to add
     */
    push_injects(inject_objects: ReturnInjectable | ReturnInjectable[]): void;
    /**
     * Method that will run all the injectable object's success_halder methods.
     *
     * @param response - the Success response that will be given to the handlers
     */
    private _run_success_handlers;
    /**
     * Method that will run all the injectable object's fail_halder methods.
     *
     * @param response - the Fail response that will be given to the handlers
     */
    private _run_fail_handlers;
    /**
     * Returns a response for an async function
     *
     * The return type of this function is a General
     * with success generic type T equal to the return type of
     * the async handler Promise
     *
     * @param handler [optional] - The function to call
     * @param name [optional] - The name of the response
     */
    async_res<R>(handler: (...args: any[]) => Promise<R>, name?: string, meta?: any): (param_object?: any) => Promise<General<R>>;
    /**
     * Returns a response for a function
     *
     * The return type of this function is a General response
     * with success generic type T equal to the return type of
     * the handler function
     *
     * @param handler [optional] - The function to call
     * @param name [optional] - The name of the response
     */
    res<R>(handler: (...args: any[]) => R, name?: string, meta?: any): (param_object?: any) => General<ReturnType<typeof handler>>;
    /**
     * Returns a response object by looking into its payload.
     * If there is an error will not look into its playload.
     * If the payload has an error will return that error.
     * Otherwse will return the payload and the message of its payload.
     *
     * @param result - The main response
     * @param name [optional] - The name of the response
     */
    inherit_res(result: General<General>, name?: string, meta?: any): General;
    /**
     * Returns a response error object
     *
     * Method overload: different return type for different arguments
     * If payload in present will return a Fail with generic type the type of
     * the payload
     *
     * @param status - Status as number. It follows the HTTP status codes
     * @param message [optional] - A human readable message of the response
     * @param payload [optional] - A payload
     * @param ex [optional] - An exception
     */
    return_error(status: number, message: string, err_code: string, err_msg: string, payload?: null, ex?: Error | null, meta?: any): Fail;
    return_error<T>(status: number, message: string, err_code: string, err_msg: string, payload: T, ex?: Error | null, meta?: any): Fail<T>;
    /**
     * Returns a successful response object
     *
     * Method overload: different return type for different arguments
     * If payload in present will return a Success with generic type the type of
     * the payload
     *
     * @param message [optional] - A human readable message of the response
     * @param payload [optional] - A payload
     */
    return_success(message: string, payload?: null, meta?: any): Success;
    return_success<T>(message: string, payload: T, meta?: any): Success<T>;
    /**
     * Returns a successful boolean response with optional message
     *
     * @param message [optional] - A message to append
     */
    return_true(message?: string, meta?: any): UBoolean<true>;
    /**
     * Retunrs a not successful boolean response with optional message
     *
     * @param message [optional] - A message to append
     */
    return_false(message?: string, meta?: any): UBoolean<false>;
}
export declare type ReturnInstance = InstanceType<typeof URNReturn>;
/**
 * A function the will create a URNReturn instance.
 * Its parameters are the same as the constructor of the class.
 */
export default function create_instance(inject?: ReturnInjectable | ReturnInjectable[]): ReturnInstance;
export {};
