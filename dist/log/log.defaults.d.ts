import { URNLogLevel, URNLogContext } from './log.t';
import { URNLogInjectable } from '../util/log_injectable.t';
interface LogDefaults {
    log_level: URNLogLevel;
    time_format: string;
    max_str_length: number;
    context: URNLogContext;
    injectors: URNLogInjectable[];
}
declare const log_defaults: LogDefaults;
export default log_defaults;
