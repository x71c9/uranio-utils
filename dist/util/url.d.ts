/**
 * Util module for URL
 *
 */
/**
 * Encode a [deeply] nested object for use in a url
 * Assumes Array.each is defined
 */
declare type Params = {
    [k: string]: any;
};
export declare function encode_params(params: Params, prefix?: string): string;
/**
 * Decode a deeply nested Url
 */
export declare function decode_params(params: string): Params;
export {};
