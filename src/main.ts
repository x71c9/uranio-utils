/*
 * Merging all under a namespace
 */

import * as urn_log from './log/index';

import * as urn_response from './response/index';

import * as urn_return from './return/index';

import * as urn_util  from './util/index';

export namespace urn_lib {
	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import log = urn_log;
	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import response = urn_response;
	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import ureturn = urn_return;
	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import util = urn_util;
	
}
