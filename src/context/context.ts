/**
 * Context module
 *
 * @packageDocumentation
 */

import * as util from '../util/index';

import * as exception from '../exception/index';

const urn_exc = exception.init(
	`CONTEXT_MODULE`,
	`Context module`
);

type ContextDefault = {
	[k:string]: any
}

class Context<T extends ContextDefault> {
	
	public context:T
	
	// public is_init:boolean
	
	constructor(_default:T, public _is_production:boolean){
		this.context = _default;
		// this.is_init = false;
	}
	
	public set(_overwrite:Partial<T>):T{
		Object.assign(this.context, _overwrite);
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
	
	// public set_init(init:boolean){
	//   this.is_init = init;
	// }
}

export function init<T>(_default:T, _is_production:boolean):Context<T>{
	const ctx = new Context(_default, _is_production);
	return ctx;
}
