/*
 * Merging all under a namespace called urn_lib
 */

import * as urn_log from './log/index';

import * as urn_response from './response/index';

import * as urn_return from './return/index';

import * as urn_util  from './util/index';

import * as urn_exception  from './exception/index';

import * as urn_context  from './context/index';

export {
	urn_log,
	urn_response,
	urn_return,
	urn_util,
	urn_exception,
	urn_context,
};

export namespace urn_lib {
	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import log = urn_log;
	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import response = urn_response;
	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import ureturn = urn_return;
	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import util = urn_util;
	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import exception = urn_exception;
	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import context = urn_context;
	
}
