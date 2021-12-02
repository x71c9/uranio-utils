"use strict";
/**
 * Middleware module for formatting responses
 *
 * @packageDocumentation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Import Response module
 */
const index_1 = require("../response/index");
const urn_log = __importStar(require("../log/"));
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
class URNReturn {
    /**
     * Constructor function
     *
     * @param inject_objects - will set the array of injectable objects
     */
    constructor(inject_objects) {
        this.inject_objects = [];
        if (inject_objects)
            this.push_injects(inject_objects);
    }
    /**
     * Method for checking if the injectable object has the methods needed
     * and for pushing it to the inject_objects array.
     *
     * @param inject_object - the object to check and add
     *
     */
    _add_inject(inject_object) {
        if (typeof inject_object.fail_handler === 'function' &&
            typeof inject_object.success_handler === 'function') {
            this.inject_objects.push(inject_object);
        }
    }
    /**
     * Method that accept one or an array of injectable objects and
     * add it/them to the injcet_objects array
     *
     * @param inject_objects - the object/s to add
     */
    push_injects(inject_objects) {
        if (Array.isArray(inject_objects)) {
            for (const inj of inject_objects)
                this._add_inject(inj);
        }
        else {
            this._add_inject(inject_objects);
        }
    }
    /**
     * Method that will run all the injectable object's success_halder methods.
     *
     * @param response - the Success response that will be given to the handlers
     */
    _run_success_handlers(response) {
        if (this.inject_objects.length > 0) {
            for (const inj_obj of this.inject_objects) {
                if (inj_obj.success_handler)
                    response = inj_obj.success_handler(response);
            }
        }
        return response;
    }
    /**
     * Method that will run all the injectable object's fail_halder methods.
     *
     * @param response - the Fail response that will be given to the handlers
     */
    _run_fail_handlers(response) {
        if (this.inject_objects.length > 0) {
            for (const inj_obj of this.inject_objects) {
                if (inj_obj.fail_handler)
                    response = inj_obj.fail_handler(response);
            }
        }
        return response;
    }
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
    async_res(handler, name) {
        return (param_object) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = {
                    status: 200,
                    success: true,
                    payload: yield handler(param_object)
                };
                return this._run_success_handlers(response);
            }
            catch (ex) {
                return this.return_error(500, 'URANIO ERROR [' + name + '] - ' + ex.message, ex.code, ex.msg, null, ex);
            }
        });
    }
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
    res(handler, name) {
        return (param_object) => {
            try {
                const response = {
                    status: 200,
                    success: true,
                    payload: handler(param_object)
                };
                return this._run_success_handlers(response);
            }
            catch (ex) {
                return this.return_error(500, 'URANIO ERROR [' + name + '] - ' + ex.message, ex.code, ex.msg, null, ex);
            }
        };
    }
    /**
     * Returns a response object by looking into its payload.
     * If there is an error will not look into its playload.
     * If the payload has an error will return that error.
     * Otherwse will return the payload and the message of its payload.
     *
     * @param result - The main response
     * @param name [optional] - The name of the response
     */
    inherit_res(result, name) {
        const return_result = {
            status: 200,
            message: '',
            success: false,
            err_code: '',
            err_msg: '',
            payload: null
        };
        if ((0, index_1.is_fail)(result)) {
            return_result.status = result.status;
            return_result.message = (name) ?
                name + ' - ' + result.message : result.message;
            return_result.ex = result.ex;
            return return_result;
        }
        if (!(0, index_1.is_fail)(result.payload) && !(0, index_1.is_success)(result.payload)) {
            return_result.message = (name) ?
                name + ' - ' + result.message : result.message;
            return return_result;
        }
        if ((0, index_1.is_fail)(result.payload)) {
            return_result.status = result.payload.status;
            return_result.message = (name) ?
                name + ' - ' + result.payload.message : result.payload.message;
            return_result.ex = result.payload.ex;
            return return_result;
        }
        return_result.message = (name) ?
            name + ' - ' + result.payload.message : result.payload.message;
        return_result.payload = result.payload.payload;
        return return_result;
    }
    return_error(status, message, err_code, err_msg, payload, ex) {
        // if there is a payload
        if (arguments.length > 4) {
            const urn_response = {
                status: status,
                message: message,
                err_code: err_code,
                err_msg: err_msg,
                ex: (ex) ? ex : null,
                payload: payload,
                success: false
            };
            return this._run_fail_handlers(urn_response);
        }
        else {
            const urn_response = {
                status: status,
                message: message,
                err_code: err_code,
                err_msg: err_msg,
                ex: null,
                payload: null,
                success: false
            };
            return this._run_fail_handlers(urn_response);
        }
    }
    return_success(message, payload) {
        // if there is a payload
        if (arguments.length > 1) {
            const urn_response = {
                status: 200,
                success: true,
                message: message,
                payload: payload
            };
            return this._run_success_handlers(urn_response);
        }
        else {
            const urn_response = {
                status: 200,
                success: true,
                message: message,
                payload: null
            };
            return this._run_success_handlers(urn_response);
        }
    }
    /**
     * Returns a successful boolean response with optional message
     *
     * @param message [optional] - A message to append
     */
    return_true(message) {
        const urn_boolean = {
            success: true
        };
        if (arguments.length > 0)
            urn_boolean.message = message;
        return urn_boolean;
    }
    /**
     * Retunrs a not successful boolean response with optional message
     *
     * @param message [optional] - A message to append
     */
    return_false(message) {
        const urn_boolean = {
            success: false
        };
        if (arguments.length > 0)
            urn_boolean.message = message;
        return urn_boolean;
    }
}
/**
 * A function the will create a URNReturn instance.
 * Its parameters are the same as the constructor of the class.
 */
function create_instance(inject) {
    urn_log.fn_debug('create for URNReturn');
    return new URNReturn(inject);
}
exports.default = create_instance;
//# sourceMappingURL=return.js.map