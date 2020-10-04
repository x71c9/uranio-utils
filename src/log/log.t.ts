
/**
 * URNLogLevel enum type
 * None = 0
 * Error = 1
 * ...
 */
export const enum URNLogLevel {NONE, ERROR, WARNING, LOG, DEBUG, FUNCTION_DEBUG}

/**
 * URNLogType type
 *
 */
export type URNLogType = 'error' | 'warn' | 'log' | 'debug' | 'fndebug';

/**
 * URNLogContext type
 *
 */
export type URNLogContext = 'terminal' | 'browser';
