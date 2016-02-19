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
