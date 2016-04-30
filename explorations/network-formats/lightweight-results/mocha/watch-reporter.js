/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

var Base = require('mocha').reporters.Base;

/**
 * Like the "min" reporter that comes with Mocha[0], but doesn't clear the
 * screen.
 *
 * @see https://github.com/mochajs/mocha/blob/master/lib/reporters/min.js
 * @see https://github.com/mochajs/mocha/wiki/Third-party-reporters
 */
function WatchReporter(runner) {
  var self = this;
  Base.call(this, runner);
  runner.on('end', function() {
    if (this.stats.failures) {
      Base.prototype.epilogue.call(self);
    }
  });
}

module.exports = WatchReporter;
