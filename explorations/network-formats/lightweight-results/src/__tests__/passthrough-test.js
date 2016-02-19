'use strict';

const passthrough = require('../passthrough');

describe('passthrough()', () => {
  it('passes the fixture file unmodified', () => {
    const result = require('../../fixtures/result');
    expect(passthrough(result)).toEqual(result);
  });
});
