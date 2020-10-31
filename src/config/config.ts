/**
 * Module for config class
 *
 * @packageDocumentation
 */

/*
 * Import Error module
 */
import * as urn_error from '../error/';

/**
 * Class for environment configuration
 *
 */
export abstract class URNConfig {
	
	public required_vars = [];
	
	public abstract set_required_vars():void;
	
	public check_required_vars():void{
		this.required_vars.map((var_name:string) => this._check_var(`urn_${var_name}`));
	}
	
	private _check_var(v:string):true{
		if(typeof process.env[v] === undefined){
			throw urn_error.create(`Environment variable [${v}] is not set`);
		}
		return true;
	}
	
}

/*
 * Export only the type of the class URNReturn
 */
// export type ConfigInstance = InstanceType<typeof URNConfig>;

/**
 * A function the will create a URNReturn instance.
 * Its parameters are the same as the constructor of the class.
 */
// export default function create_instance()
//     :ConfigInstance{
//   return new URNConfig();
// }
