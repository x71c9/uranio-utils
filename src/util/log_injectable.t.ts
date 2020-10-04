/**
 * Export interface for log injectable object.
 *
 * This type is used in log module where the injectable objects
 * will be injected in the log functions.
 *
 */
export interface URNLogInjectable{
	
	/**
	 * Method
	 */
	error_inject?(...p:any):void;
	
	/**
	 * Method
	 */
	warn_inject?(...p:any):void;
	
	/**
	 * Method
	 */
	log_inject?(...p:any):void;

	/**
	 * Method
	 */
	debug_inject?(...p:any):void;
	
	/**
	 * Method
	 */
	fndebug_inject?(...p:any):void;
	
}
