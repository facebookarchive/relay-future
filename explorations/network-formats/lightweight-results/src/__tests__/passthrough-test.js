/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

'use strict';

const passthrough = require('../passthrough');

describe('passthrough()', () => {
  it('passes the fixture file unmodified', () => {
    const result = require('../../fixtures/result');
    expect(passthrough(result)).toEqual(result);
  });
});
