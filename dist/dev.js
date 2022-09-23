"use strict";
// import {urn_util} from './index';
// const a = urn_util.url.encode_params({sort: {_date: 1, _id: -1}, else: ['3',4]});
// console.log(a);
// const b = urn_util.url.decode_params('sort[_date]=1&sort[_id]=-1&else[]=3&else[]=4');
// console.log(b);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
// urn_log.init(urn_log.LogLevel.TRACE);
index_1.urn_log.init({
    log_level: index_1.urn_log.LogLevel.TRACE,
    debug_info: true,
    // prefix_log_type: false,
    color: true,
    // full_trace: true
});
index_1.urn_log.warn('This is a warning.');
index_1.urn_log.debug('This is a debug.');
index_1.urn_log.info('This is a info.');
index_1.urn_log.success('This is a success.');
index_1.urn_log.error('This is a error.');
let Pippo = class Pippo {
    constructor(field) {
        this.field = field;
    }
    pippo() {
        console.log(this.field);
    }
};
Pippo = __decorate([
    index_1.urn_log.util.decorators.debug_constructor,
    index_1.urn_log.util.decorators.debug_methods
], Pippo);
const pippo = new Pippo('D');
pippo.pippo();
// urn_log.warn(`Hello`);
// urn_log.warn(`Hello`);
// urn_log.trace(`Hello`);
// urn_log.trace(`Hello`);
// urn_log.error(`Hello`);
// urn_log.error(`Hello`);
// urn_log.debug(`Hello`);
// urn_log.debug(`Hello`);
// urn_log.warn(`Hello`);
// import {urn_context} from './index';
// type Def = {
// 	fetch: string,
// 	log_prefix: string,
// 	dev_log_prefix: string,
// 	service_obj: {
// 		p1: string
// 		p2: {
// 			p3: string
// 		}
// 	}
// }
// const def:Def = {
// 	fetch: 'axios',
// 	log_prefix: 'A',
// 	dev_log_prefix: 'B',
// 	service_obj: {
// 		p1: 'a',
// 		p2: {
// 			p3: 'd'
// 		}
// 	}
// };
// const over:Partial<Def> = {
//   dev_log_prefix: 'C',
//   service_obj: {
//     p1: '',
//     p2: {
//       p3: '222'
//     }
//   }
// };
// const over2:Partial<Def> = {
// 	dev_log_prefix: 'C2222222'
// };
// const ctx = urn_context.create(def, false);
// ctx.set(over2);
// const o = ctx.get('log_prefix');
// console.log(o);
//# sourceMappingURL=dev.js.map