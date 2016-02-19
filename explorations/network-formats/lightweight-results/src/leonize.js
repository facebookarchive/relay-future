'use strict';

import 'babel-core/polyfill';
import LEON from 'leon';

/**
 * https://www.npmjs.com/package/leon
 */
export default function leonize(results) {
  return LEON.encode(results);
}
