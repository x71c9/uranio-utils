/**
 * Module for URANIO error
 *
 * @packageDocumentation
 */
export declare class URNError extends Error {
    message: string;
    constructor(message?: string, error?: Error);
}
export declare type ErrorInstance = InstanceType<typeof URNError>;
/**
 * A function the will create a URNError instance.
 * Its parameters are the same as the constructor of the class.
 */
export default function create(message?: string, error?: Error): ErrorInstance;
