/*
 * Merging all under a namespace called urn_lib
 */

import * as urn_log from './log/';

import * as urn_response from './response/';

import * as urn_return from './return/';

import * as urn_util  from './util/';

import * as urn_exception  from './exception/';

// import * as urn_config  from './config/';

export {
	urn_log,
	urn_response,
	urn_return,
	urn_util,
	urn_exception,
	// urn_config
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
	// export import config = urn_config;
}
