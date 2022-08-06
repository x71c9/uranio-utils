import {urn_log} from './index';
urn_log.init({
	log_level: urn_log.LogLevel.FUNCTION_DEBUG,
	context: urn_log.LogContext.BROWSER,
	prefix: ''
});

// urn_log.trace('FN DEBUG');
// urn_log.trace('Lorem ipsum (something) else: {}');
urn_log.debug('DEBUG');
urn_log.debug('Lorem ipsum (something) else: {}');
urn_log.warn('WARN');
urn_log.warn('Lorem ipsum (something) else: {}');
urn_log.error('ERROR');
urn_log.error('Lorem ipsum (something) else: {}');

// function component() {
//   const element = document.createElement('div');
//   element.innerHTML = 'Hello webpack';
//   return element;
// }
// document.body.appendChild(component());
// export function print():void {
//   console.log('I get called from print.js!');
// }

