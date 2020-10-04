/**
 * Export interface for injectable object.
 *
 * This type is used in URNResponse class where the injectable objects
 * will be used as middleware for the response.
 *
 * Every object must have a success_handler and a fail_handler for handling
 * Success responses and Fail responses.
 *
 */
export interface URNResponseInjectable{
	
	/**
	 * Method for handling Success response.
	 */
	success_handler<T>(p:T):T;
	
	/**
	 * Method for handling Fail response.
	 */
	fail_handler<T>(p:T):T;
	
}
