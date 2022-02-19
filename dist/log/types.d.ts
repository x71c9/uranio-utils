/**
 * Export types module for logging
 *
 * @packageDocumentation
 */
/**
 * LogLevel enum type
 * ...
 */
export declare enum LogLevel {
    NONE = 0,
    ERROR = 1,
    WARNING = 2,
    DEBUG = 3,
    FUNCTION_DEBUG = 4
}
/**
 * LogContext enum type
 *
 */
export declare enum LogContext {
    TERMINAL = "TERMINAL",
    BROWSER = "BROWSER"
}
/**
 * LogType type
 *
 */
export declare type LogType = 'error' | 'warn' | 'debug' | 'fn_debug';
/**
 * LogContext type
 *
 */
/**
 * Export interface for log injectable object.
 *
 * This type is used in log module where the injectable objects
 * will be injected in the log functions.
 *
 */
export interface LogInjectable {
    /**
     * Method
     */
    error_inject?(...p: any): void;
    /**
     * Method
     */
    warn_inject?(...p: any): void;
    /**
     * Method
     */
    debug_inject?(...p: any): void;
    /**
     * Method
     */
    fn_debug_inject?(...p: any): void;
}
/**
 * Interface for LogDefaults object
 *
 */
/**
 * LogConfig type
 *
 */
export declare type LogConfig = {
    log_level: LogLevel;
    time_format: string;
    max_str_length: number;
    context: LogContext;
    prefix: string;
    prefix_type: boolean;
    debug_info: boolean;
    color: boolean;
    injectors: LogInjectable[];
};
