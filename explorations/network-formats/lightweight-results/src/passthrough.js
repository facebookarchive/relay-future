'use strict';

import 'babel-core/polyfill';

/**
 * This function represents the current status quo. It passes the returned data
 * object straight back to the caller.
 */
export default function passthrough(results) {
  return results;
}
