/**
 * Module for logging
 *
 * @packageDocumentation
 */
import log_defaults from './log.defaults';
export { log_defaults as defaults };
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
