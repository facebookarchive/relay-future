/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

'use strict';

import 'babel-core/polyfill';
import msgpack from 'msgpack-lite';

/**
 */
export default function messagepackize(results) {
  return msgpack.encode(results);
}
