/**
 * Context module
 *
 * The Context calss is an abstraction for handling configuration object and
 * environmental variables.
 *
 * @packageDocumentation
 */

import * as util from '../util/index';

import * as exception from '../exception/index';

import * as log from '../log/index';

const urn_exc = exception.init(`CONTEXT_MODULE`, `Context module`);

type ContextDefault = {
	[k:string]: any
}

class Context<T extends ContextDefault> {
	
	public context:T
	
	constructor(_default:T, public _is_production:boolean, public name?:string){
		this.context = _default;
	}
	
	public set(_overwrite:Partial<T>):T{
		for(const [okey, ovalue] of Object.entries(_overwrite)){
			if(typeof ovalue === typeof this.context[okey]){
				this.context[okey as keyof T] = ovalue;
			}
			// const noclientkey = okey.replace(`client_`,'');
			// if(typeof ovalue === typeof this.context[noclientkey]){
			//   this.context[okey as keyof T] = ovalue;
			// }
			// // server context must contain also client_ starting key
			// // so that util generate client config can work.
			// if(okey.indexOf('client_') === 0){
			//   this.context[okey as keyof T] = ovalue;
			// }
		}
		return this.context;
	}
	
	public get<k extends string>(key:k):T[k]{
		if(!util.object.has_key(this.context, key)){
			throw urn_exc.create(
				`INVALID_CONTEXT_KEY`,
				`Cannot find key [${key}] in Context.`
			);
		}
		if(
			!this._is_production
			&& typeof this.context[`dev_${key}`] !== 'undefined'
		){
			return this.context[`dev_${key}`] as T[k];
		}
		return this.context[key];
	}
	
	public get_all():T{
		return this.context;
	}
	
	public set_env(){
		const env = this._get_env_vars();
		// console.log(this.name, env);
		this.set(env);
	}
	
	private _get_env_vars():T{
		const env:T = {} as T;
		for(const [conf_key, conf_value] of Object.entries(this.context)){
			const env_var_name = `URN_${conf_key.toUpperCase()}`;
			if(env_var_name === `URN_LOG_LEVEL` || env_var_name === `URN_DEV_LOG_LEVEL`){
				const string_log_level = process.env[env_var_name] as unknown;
				if(typeof string_log_level === 'string' && string_log_level.length > 1){
					process.env[env_var_name] = log.LogLevel[string_log_level as unknown as log.LogLevel];
				}
			}
			switch(typeof conf_value){
				case 'number':{
					if(
						typeof process.env[env_var_name] === 'number'
						|| typeof process.env[env_var_name] === 'string'
						&& process.env[env_var_name] !== ''
					){
						(env as any)[conf_key] = Number(process.env[env_var_name]);
					}
					break;
				}
				case 'boolean':{
					if(
						typeof process.env[env_var_name] === 'boolean'
						|| typeof process.env[env_var_name] === 'string'
						&& process.env[env_var_name] !== ''
					){
						(env as any)[conf_key] =
							(process.env[env_var_name] === 'true')
							|| (process.env[env_var_name] as any === true);
					}
					break;
				}
				case 'string':{
					if(
						typeof process.env[env_var_name] === 'string'
						&& process.env[env_var_name] !== ''
					){
						(env as any)[conf_key] = process.env[env_var_name];
					}
					break;
				}
			}
		}
		return env;
	}
	
	// public set_init(init:boolean){
	//   this.is_init = init;
	// }
}

export function create<T>(_default:T, _is_production:boolean, name?:string):Context<T>{
	const ctx = new Context(_default, _is_production, name);
	return ctx;
}

