/**
 * Module for logging
 *
 * @packageDocumentation
 */
import { LogLevel, LogContext, LogInjectable } from './types';
import log_defaults from './log.defaults';
export { log_defaults as defaults };
/**
 * Log init
 *
 * @param type - the injector method type, same as LogType.
 * @param context - the injector context type, same as LogContext.
 * @param injectors - this will override the default injector [the console injector]
 */
export declare function init(level?: LogLevel, context?: LogContext, prefix?: string, injectors?: LogInjectable[]): void;
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
