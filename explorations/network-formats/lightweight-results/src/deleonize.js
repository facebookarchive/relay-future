'use strict';

import 'babel-core/polyfill';
import LEON from 'leon';

/**
 * https://www.npmjs.com/package/leon
 */
export default function deleonize(results) {
  return LEON.decode(results);
}
