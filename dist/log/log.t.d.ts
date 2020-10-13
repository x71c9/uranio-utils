/**
 * URNLogLevel enum type
 * None = 0
 * Error = 1
 * ...
 */
export declare const enum URNLogLevel {
    NONE = 0,
    ERROR = 1,
    WARNING = 2,
    LOG = 3,
    DEBUG = 4,
    FUNCTION_DEBUG = 5
}
/**
 * URNLogType type
 *
 */
export declare type URNLogType = 'error' | 'warn' | 'log' | 'debug' | 'fndebug';
/**
 * URNLogContext type
 *
 */
export declare type URNLogContext = 'terminal' | 'browser';
