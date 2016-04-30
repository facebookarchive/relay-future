/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

'use strict';

import 'babel-core/polyfill';
import LEON from 'leon';

/**
 * https://www.npmjs.com/package/leon
 */
export default function leonize(results) {
  return LEON.encode(results);
}
