/**
 * Module for logging
 *
 * @packageDocumentation
 */
import { LogLevel, LogConfig } from './types';
import log_defaults from './log.defaults';
export { log_defaults as defaults };
/**
 * Log init
 *
 */
export declare function init(log_config?: LogLevel): void;
export declare function init(log_config?: Partial<LogConfig>): void;
/**
 * Debug functions log
 *
 * @param ...params - variables to log
 */
export declare function trace(...params: any[]): void;
/**
 * Debug log
 *
 * @param ...params - variables to log
 */
export declare function debug(...params: any[]): void;
/**
 * Info log
 *
 * @param ...params - variables to log
 */
export declare function info(...params: any[]): void;
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
