/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

'use strict';

import sinon from 'sinon';

let sandbox;

beforeEach(function() {
  sandbox = sinon.sandbox.create();
});

afterEach(function() {
  sandbox.restore();
});

global.sinon = {
  spy() {
    return sinon.spy(...arguments);
  },

  stub() {
    return sandbox.stub(...arguments);
  },

  useFakeTimers() {
    return sinon.useFakeTimers(...arguments);
  }
};
