/**
 * Middleware module for formatting responses
 *
 * @packageDocumentation
 */
import { URNResponse } from './return.t';
import { URNResponseInjectable } from '../util/response_injectable.t';
/**
 * Class URNReturn has all the methods for creating URNResponse objects.
 * Its constructor accepts an array of URNResponseInjectable objects.
 * This type of objects must have two functions:
 * success_handler and fail_handler.
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
    inject_objects: URNResponseInjectable[];
    /**
     * Constructor function
     *
     * @param inject_objects - will set the array of injectable objects
     */
    constructor(inject_objects?: URNResponseInjectable | URNResponseInjectable[]);
    /**
     * Method for checking if the injectable object has the methods needed
     * and for pushing it to the inject_objects array.
     *
     * @param inject_object - the object to check and add
     *
     */
    private _add_inject;
    /**
     * Method that accept one or an array of injectable objects and add it/them to the
     * injcet_objects array
     *
     * @param inject_objects - the object/s to add
     */
    push_injects(inject_objects: URNResponseInjectable | URNResponseInjectable[]): void;
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
     * The return type of this function is a Response
     * with success generic type T equal to the return type of the async handler Promise
     *
     * @param handler [optional] - The function to call
     * @param name [optional] - The name of the response
     */
    async_res<R>(handler: (...args: any[]) => Promise<R>, name?: string): (param_object?: any) => Promise<URNResponse.Response<R>>;
    /**
     * Returns a response for a function
     *
     * The return type of this function is a Response
     * with success generic type T equal to the return type of the handler function
     *
     * @param handler [optional] - The function to call
     * @param name [optional] - The name of the response
     */
    res<R>(handler: (...args: any[]) => R, name?: string): (param_object?: any) => URNResponse.Response<ReturnType<typeof handler>>;
    /**
     * Returns a response object by looking into its payload.
     * If there is an error will not look into its playload.
     * If the payload has an error will return that error.
     * Otherwse will return the payload and the message of its payload.
     *
     * @param result - The main response
     * @param name [optional] - The name of the response
     */
    inherit_res(result: URNResponse.Response<URNResponse.Response>, name?: string): URNResponse.Response;
    /**
     * Returns a response error object
     *
     * Method overload: different return type for different arguments
     * If payload in present will return a Fail with generic type the type of the payload
     *
     * @param status - Status as number. It follows the HTTP status codes
     * @param message [optional] - A human readable message of the response
     * @param payload [optional] - A payload
     * @param ex [optional] - An exception
     */
    return_error(status: number, message: string, payload?: null, ex?: Error | null): URNResponse.Fail;
    return_error<T>(status: number, message: string, payload: T, ex?: Error | null): URNResponse.Fail<T>;
    /**
     * Returns a successful response object
     *
     * Method overload: different return type for different arguments
     * If payload in present will return a Success with generic type the type of the payload
     *
     * @param message [optional] - A human readable message of the response
     * @param payload [optional] - A payload
     */
    return_success(message: string, payload?: null): URNResponse.Success;
    return_success<T>(message: string, payload: T): URNResponse.Success<T>;
    /**
     * Returns a successful boolean response with optional message
     *
     * @param message [optional] - A message to append
     */
    return_true(message?: string): URNResponse.UBoolean<true>;
    /**
     * Retunrs a not successful boolean response with optional message
     *
     * @param message [optional] - A message to append
     */
    return_false(message?: string): URNResponse.UBoolean<false>;
}
/**
 * A function the will create a URNReturn instance.
 * Its parameters are the same as the constructor of the class.
 */
declare function create_instance(inject?: URNResponseInjectable): URNReturn;
export default create_instance;
