/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

require('babel/polyfill');

var fs = require('fs');
var path = require('path');

process.on('unhandledRejection', function(reason, promise) {
  throw reason;
});

global.expect = require('expect');

require('babel/register')(
  JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '..', '.babelrc')
    )
  )
);
