"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
index_1.urn_log.init(index_1.urn_log.LogLevel.FUNCTION_DEBUG, index_1.urn_log.LogContext.BROWSER, '[URANIO] ');
index_1.urn_log.fn_debug('FN DEBUG');
index_1.urn_log.fn_debug('Lorem ipsum (something) else: {}');
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