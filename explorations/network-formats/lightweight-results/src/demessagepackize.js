'use strict';

import 'babel-core/polyfill';
import msgpack from 'msgpack-lite';

/**
 */
export default function demessagepackize(results) {
  return msgpack.decode(results);
}
