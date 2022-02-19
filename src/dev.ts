
import {urn_log} from './index';

// urn_log.init(urn_log.LogLevel.FUNCTION_DEBUG);
urn_log.init({
	log_level: urn_log.LogLevel.FUNCTION_DEBUG,
	debug_info: false,
	color: true
});

urn_log.warn(`Hello`);
urn_log.warn(`Hello`);

