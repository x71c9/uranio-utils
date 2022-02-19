
import {urn_log} from './index';

// urn_log.init(urn_log.LogLevel.FUNCTION_DEBUG);
urn_log.init({
	level: urn_log.LogLevel.FUNCTION_DEBUG,
	debug_info: false
});

urn_log.warn(`Hello`);
urn_log.warn(`Hello`);

