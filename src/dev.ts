// import {urn_util} from './index';
// const a = urn_util.url.encode_params({sort: {_date: 1, _id: -1}, else: ['3',4]});
// console.log(a);
// const b = urn_util.url.decode_params('sort[_date]=1&sort[_id]=-1&else[]=3&else[]=4');
// console.log(b);

import {urn_log} from './index';

// urn_log.init(urn_log.LogLevel.TRACE);
urn_log.init({
  log_level: urn_log.LogLevel.TRACE,
  debug_info: true,
  // prefix_log_type: false,
  color: true
});

urn_log.warn('This is a warning.');
urn_log.debug('This is a debug.');
urn_log.info('This is a info.');
urn_log.error('This is a error.');

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
