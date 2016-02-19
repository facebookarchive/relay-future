'use strict';

import 'babel-core/polyfill';
import msgpack from 'msgpack-lite';

/**
 */
export default function messagepackize(results) {
  return msgpack.encode(results);
}
