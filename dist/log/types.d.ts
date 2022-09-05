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
    INFO = 3,
    DEBUG = 4,
    TRACE = 5
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
export declare type LogType = 'error' | 'warn' | 'info' | 'success' | 'debug' | 'trace';
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
    error_inject?(...p: any): void;
    warn_inject?(...p: any): void;
    info_inject?(...p: any): void;
    success_inject?(...p: any): void;
    debug_inject?(...p: any): void;
    trace_inject?(...p: any): void;
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
    prefix_log_type: boolean;
    debug_info: boolean;
    color: boolean;
    injectors: LogInjectable[];
    full_trace: boolean;
};
