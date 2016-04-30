/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

'use strict';

import 'babel-core/polyfill';

/**
 * This function represents the current status quo. It passes the returned data
 * object straight back to the caller.
 */
export default function passthrough(results) {
  return results;
}
