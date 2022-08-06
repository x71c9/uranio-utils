"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
index_1.urn_log.init({
    log_level: index_1.urn_log.LogLevel.FUNCTION_DEBUG,
    context: index_1.urn_log.LogContext.BROWSER,
    prefix: ''
});
// urn_log.trace('FN DEBUG');
// urn_log.trace('Lorem ipsum (something) else: {}');
index_1.urn_log.debug('DEBUG');
index_1.urn_log.debug('Lorem ipsum (something) else: {}');
index_1.urn_log.warn('WARN');
index_1.urn_log.warn('Lorem ipsum (something) else: {}');
index_1.urn_log.error('ERROR');
index_1.urn_log.error('Lorem ipsum (something) else: {}');
// function component() {
//   const element = document.createElement('div');
//   element.innerHTML = 'Hello webpack';
//   return element;
// }
// document.body.appendChild(component());
// export function print():void {
//   console.log('I get called from print.js!');
// }
//# sourceMappingURL=html.js.map