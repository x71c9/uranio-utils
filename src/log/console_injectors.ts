/**
 * Console Injector module.
 *
 * This module define the function that log inside the console, both in the
 * browser and the terminal.
 *
 * @packageDocumentation
 *
 */
import dateFormat from 'dateformat';

import {LogType, LogInjectable, LogContext} from './types';

import {safe_stringify_oneline} from '../util/json';

import log_defaults from './log.defaults';

/*
 * Console injectors methods
 */
export namespace console_injectors {
	
	export const terminal:LogInjectable = {
		
		error_inject: (...p:any) => {
			_cecho('error', _terminal_styles.fgRed, 6, -1, ...p);
		},
		
		warn_inject: (...p:any) => {
			_cecho('warn', _terminal_styles.fgYellow, 6, 3, ...p);
		},
		
		debug_inject: (...p:any) => {
			_cecho('debug', _terminal_styles.fgBlue, 6, 1, ...p);
		},
		
		fn_debug_inject: (...p:any) => {
			_cecho('fn_debug', _terminal_styles.dim, 6, 1, ...p);
		}
		
	};

	export const browser:LogInjectable = {
		
		error_inject: (...p:any) => {
			_cecho('error', error_console_style, 0, 0, ...p);
		},
		
		warn_inject: (...p:any) => {
			_cecho('warn', warn_console_style, 0, 0, ...p);
		},
		
		debug_inject: (...p:any) => {
			_cecho('debug', debug_console_style, 0, 0, ...p);
		},
		
		fn_debug_inject: (...p:any) => {
			_cecho('fn_debug', fn_debug_console_style, 0, 0, ...p);
		}
		
	};

}

/**
 * Common commands between all the types of logs
 *
 * @param type - type of log
 * @param style - terminal_style to use for the log
 * @param depth - how many lines of stack should be printed
 * @param start - at what line the stack should start
 * @param ...params - variables to log
 */
function _cecho(type:LogType, style:string|string[], start:number, depth:number, ...params:any[])
		:void{
	const env_no_colors = (process.env.NO_COLOR == 'true') ? true : false;
	const styles = (Array.isArray(style)) ? style.join(' ') : style;
	const stylelog = (log_defaults.color === true && env_no_colors === false) ?
		styles + '%s' + _terminal_styles.reset : '';
	if(log_defaults.debug_info === true){
		_log_stack(type, stylelog, start, depth, (type === 'error'));
	}
	for(const p of params){
		// if(typeof p === 'object'){
		_log_param(p, stylelog, type);
		// }else{
		// 	let processed_param = p;
		// 	if(typeof log_defaults.prefix === 'string' && log_defaults.prefix !== ''){
		// 		processed_param = `${log_defaults.prefix} ${p}`;
		// 	}
		// 	_log_param(processed_param, stylelog, type);
		// }
	}
	if(log_defaults.context !== LogContext.BROWSER && log_defaults.debug_info === true){
		console.log(stylelog, ' ');
	}
}

/**
 * Log stack
 *
 * @param type - the type of log [error|warn|log|...]. See URNLogType.
 * @param stylelog - formatted string for styling.
 * @param start - at what line the stack should start.
 * @param depth - how many lines should be log from the stack.
 * @param is_error - if true will console.error
 */
function _log_stack(type:LogType, stylelog:string, start=0, depth=-1, is_error=false)
		:void{
	const stack = new Error().stack;
	Error.stackTraceLimit = 32;
	if(stack == undefined){
		console.error('CANNOT LOG STACK');
		return;
	}
	const prefix = (log_defaults.prefix !== '') ? log_defaults.prefix + ' ' : '';
	const now = dateFormat(new Date(), log_defaults.time_format);
	const head_string = prefix + now + ' <' + type + '> ';
	const splitted_stack = stack.split('\n');
	const till = (depth === -1) ? splitted_stack.length - start : depth;
	
	// skip stack line from log module and return module
	let j = start;
	let string = 'return.ts';
	while(
		j < splitted_stack.length
		&& typeof string === 'string'
		&& (
			string.includes('return.ts')
			|| string.includes('log.ts')
			|| string.includes('error.ts')
		)
	){
		const psc = splitted_stack[j];
		const call_info = /\(([^)]+)\)/.exec(psc); // get info from inside ()
		string = (call_info != null) ? call_info[1] : psc.split('at ')[1];
		j++;
	}
	
	for(let i = j - 1; i < j -1 + till && i < splitted_stack.length; i++){
		const psc = splitted_stack[i];
		const call_info = /\(([^)]+)\)/.exec(psc); // get info from inside ()
		let string = '';
		string += head_string;
		string += (call_info != null) ? call_info[1] : psc.split('at ')[1];
		if(log_defaults.prefix_type === true){
			string = `[${type}${'_'.repeat(8 - type.length)}]${string}`;
		}
		if(log_defaults.context === LogContext.BROWSER){
			if(is_error){
				console.error('%c%s', stylelog, string);
			}else{
				console.log('%c%s', stylelog, string);
			}
		}else{
			if(is_error){
				if(stylelog){
					console.error(stylelog, string);
				}else{
					console.log(string);
				}
			}else{
				if(stylelog){
					console.log(stylelog, string);
				}else{
					console.log(string);
				}
			}
		}
	}
}

/**
 * Log prameter
 *
 * @param p - anything to be logged.
 * @param stylelog - a formatted string for styling.
 */
function _log_param(p:any, stylelog:string, type:LogType)
		:void{
	let processed_param:string[] = [];
	if(p instanceof Error && p.stack !== undefined){
		if(log_defaults.context === LogContext.TERMINAL){
			processed_param = p.stack.split('\n');
		}else{
			processed_param = [p as any];
		}
	}else if(typeof p === 'object'){
		if(log_defaults.context === LogContext.TERMINAL){
			processed_param = safe_stringify_oneline(p).split('\n');
		}else{
			processed_param = [p];
		}
	}else if(typeof p === 'string'){
		if(log_defaults.context === LogContext.TERMINAL){
			processed_param = p.split('\n');
		}else{
			processed_param = [p];
		}
	}else if(typeof p === 'number'){
		processed_param = [p.toString()];
	}else if(p === false){
		processed_param = ['false'];
	}else if(p === 0){
		processed_param = ['0'];
	}else if(p === undefined){
		processed_param = ['undefined'];
	}else if(p === null){
		processed_param = ['null'];
	}
	for(let pp of processed_param){
		if(log_defaults.context === LogContext.BROWSER){
			switch(type){
				case 'error':{
					if(pp as any instanceof Error){
						console.error('%c%s', stylelog, `${log_defaults.prefix} ERROR`, pp);
					}else if(typeof pp === 'object'){
						console.error('%c%s', stylelog, `${log_defaults.prefix} ERROR`, pp);
					}else{
						console.error('%c%s', stylelog, pp);
					}
					break;
				}
				case 'warn':{
					if(typeof pp === 'object'){
						console.warn('%c%s', stylelog, `${log_defaults.prefix} WARNING`, pp);
					}else{
						console.warn('%c%s', stylelog, pp);
					}
					break;
				}
				default:{
					if(typeof pp === 'object'){
						console.log(`%c${log_defaults.prefix}`, stylelog, pp);
					}else{
						console.log('%c%s', stylelog, pp);
					}
				}
			}
		}else{
			if(log_defaults.prefix !== ''){
				pp = `${log_defaults.prefix} ${pp}`;
			}
			if(log_defaults.prefix_type === true){
				pp = `[${type}${'_'.repeat(8 - type.length)}]${pp}`;
			}
			if(type === 'error'){
				if(stylelog !== ''){
					console.error(stylelog, pp);
				}else{
					console.error(pp);
				}
			}else{
				if(stylelog !== ''){
					console.log(stylelog, pp);
				}else{
					console.log(pp);
				}
			}
		}
	}
}

/**
 * List of all the style that can be used in terminal
 */
const _terminal_styles = {
	'reset': "\x1b[0m",
	'bright' : "\x1b[1m",
	'dim' : "\x1b[2m",
	'underscore' : "\x1b[4m",
	'blink' : "\x1b[5m",
	'reverse' : "\x1b[7m",
	'hidden' : "\x1b[8m",
	'fgBlack' : "\x1b[30m",
	'fgRed' : "\x1b[31m",
	'fgGreen' : "\x1b[32m",
	'fgYellow' : "\x1b[33m",
	'fgBlue' : "\x1b[34m",
	'fgMagenta' : "\x1b[35m",
	'fgCyan' : "\x1b[36m",
	'fgWhite' : "\x1b[37m",
	'fgDefault' : "\x1b[39m",
	'fgLightGrey' : "\x1b[90m",
	'fgLightRed' : "\x1b[91m",
	'fgLightGreen' : "\x1b[92m",
	'fglightYellow' : "\x1b[93m",
	'fgLightBlue' : "\x1b[94m",
	'fgLightMagenta' : "\x1b[95m",
	'fgLightCyan' : "\x1b[96m",
	'fgLightWhite' : "\x1b[97m",
	'bgBlack' : "\x1b[40m",
	'bgRed' : "\x1b[41m",
	'bgGreen' : "\x1b[42m",
	'bgYellow' : "\x1b[43m",
	'bgBlue' : "\x1b[44m",
	'bgMagenta' : "\x1b[45m",
	'bgCyan' : "\x1b[46m",
	'bgWhite' : "\x1b[47m",
	'bgDefault' : "\x1b[49m",
	'Light Gray' : "\x1b[100m",
	'Light Red' : "\x1b[101m",
	'Light Green' : "\x1b[102m",
	'Light Yellow' : "\x1b[103m",
	'Light Blue' : "\x1b[104m",
	'Light Magenta' : "\x1b[105m",
	'Light Cyan' : "\x1b[106m",
	'Light White' : "\x1b[107m"
};

const _console_styles = {
	underline: 'text-decoration: underline;',
	fg_black: 'color: black;',
	fg_red: 'color: red;',
	fg_green: 'color: green;',
	fg_yellow: 'color: yellow;',
	fg_orange: 'color: #e69500;',
	fg_blue: 'color: blue;',
	fg_magenta: 'color: magenta;',
	fg_cyan: 'color: cyan;',
	fg_white: 'color: white;',
	fg_grey: 'color: grey;',
	fg_fndebug: 'color: #848484;',
	fg_debug: 'color: #4880ae;',
	fg_log: 'color: #006ec8;',
	fg_warn: 'color: #cf8d00;',
	fg_error: 'color: #e20000;',
	bg_black: 'background-color: black;',
	bg_red: 'background-color: red;',
	bg_green: 'background-color: green;',
	bg_yellow: 'background-color: yellow;',
	bg_blue: 'background-color: blue;',
	bg_magenta: 'background-color: magenta;',
	bg_cyan: 'background-color: cyan;',
	bg_white: 'background-color: white;',
	padding: 'padding: 4px;',
	fg_urn_blue: 'color: #0029FF;',
	bg_urn_blue: 'background-color: #ECF4FF;',
	fg_urn_purple: 'color: #4200FF;',
	bg_urn_purple: 'background-color: #F4ECFF;',
};

const fn_debug_console_style:string[] = [
	// _console_styles.padding,
	_console_styles.fg_urn_blue,
	_console_styles.bg_urn_blue
];
const debug_console_style:string[] = [
	// _console_styles.padding,
	_console_styles.fg_urn_purple,
	_console_styles.bg_urn_purple
];
const warn_console_style:string[] = [
	// _console_styles.padding,
	_console_styles.fg_black
];
const error_console_style:string[] = [
	// _console_styles.padding,
	_console_styles.fg_black
];
