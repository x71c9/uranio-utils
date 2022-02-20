
import {urn_log} from './index';

// urn_log.init(urn_log.LogLevel.FUNCTION_DEBUG);
urn_log.init({
	log_level: urn_log.LogLevel.FUNCTION_DEBUG,
	debug_info: false,
	prefix_type: true,
	color: true
});

urn_log.warn(`Hello`);
urn_log.warn(`Hello`);
urn_log.fn_debug(`Hello`);
urn_log.fn_debug(`Hello`);
urn_log.error(`Hello`);
urn_log.error(`Hello`);
urn_log.debug(`Hello`);
urn_log.debug(`Hello`);
urn_log.warn(`Hello`);

