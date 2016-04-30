/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

'use strict';

const flatten = require('../flatten');

describe('flatten()', () => {
  it('processes a simple result', () => {
    const input = {
      data: {
        person: {
          name: 'greg',
          size: 10,
        },
      },
    };
    const output = flatten(input);
    const expected = {
      __nodes__: {},
      data: {
        person: {
          name: 'greg',
          size: 10,
        },
      },
    };
    expect(output).toEqual(expected);
  });

  it('processes a result with multiple top-level fields', () => {
    const input = {
      data: {
        person: {
          name: 'greg',
          size: 10,
        },
        headquarters: {
          location: 'Menlo Park',
        },
      },
    };
    const output = flatten(input);
    const expected = {
      __nodes__: {},
      data: {
        person: {
          name: 'greg',
          size: 10,
        },
        headquarters: {
          location: 'Menlo Park',
        },
      },
    };
    expect(output).toEqual(expected);
  });

  it('processes a result with basic nesting', () => {
    const input = {
      data: {
        person: {
          name: 'Greg',
          size: 10,
          location: {
            name: 'San Francisco',
          },
        },
      },
    };
    const output = flatten(input);
    const expected = {
      __nodes__: {},
      data: {
        person: {
          name: 'Greg',
          size: 10,
          location: {
            name: 'San Francisco',
          },
        },
      },
    };
    expect(output).toEqual(expected);
  });

  it('processes a result containing an array', () => {
    const input = {
      data: {
        person: {
          name: 'Greg',
          emails: [
            'glh@fb.com',
            'greg@hurrell.net',
          ],
        },
      },
    };
    const output = flatten(input);
    const expected = {
      __nodes__: {},
      data: {
        person: {
          name: 'Greg',
          emails: [
            'glh@fb.com',
            'greg@hurrell.net',
          ],
        },
      },
    };
    expect(output).toEqual(expected);
  });

  it('processes a result containing an array with nested objects', () => {
    const input = {
      data: {
        person: {
          name: 'Greg',
          emails: [
            {
              address: 'glh@fb.com',
            },
            {
              address: 'greg@hurrell.net',
            },
          ],
        },
      },
    };
    const output = flatten(input);
    const expected = {
      __nodes__: {},
      data: {
        person: {
          name: 'Greg',
          emails: [
            {
              address: 'glh@fb.com',
            },
            {
              address: 'greg@hurrell.net',
            },
          ],
        },
      },
    };
    expect(output).toEqual(expected);
  });

  it('processes a result containing an array with nested objects with IDs', () => {
    const input = {
      data: {
        person: {
          name: 'Greg',
          emails: [
            {
              id: 'Z2xoQGZiLmNvbQ==',
              address: 'glh@fb.com',
            },
            {
              id: 'Z3JlZ0BodXJyZWxsLm5ldA==',
              address: 'greg@hurrell.net',
            },
          ],
        },
      },
    };
    const output = flatten(input);
    const expected = {
      __nodes__: {
        'Z2xoQGZiLmNvbQ==': {
          address: 'glh@fb.com',
          id: 'Z2xoQGZiLmNvbQ==',
        },
        'Z3JlZ0BodXJyZWxsLm5ldA==': {
          address: 'greg@hurrell.net',
          id: 'Z3JlZ0BodXJyZWxsLm5ldA==',
        },
      },
      data: {
        person: {
          name: 'Greg',
          emails: [
            {
              id: 'Z2xoQGZiLmNvbQ==',
            },
            {
              id: 'Z3JlZ0BodXJyZWxsLm5ldA==',
            },
          ],
        },
      },
    };
    expect(output).toEqual(expected);
  });

  it('processes a result with an id', () => {
    const input = {
      data: {
        viewer: {
          id: '660361306',
          name: 'Greg',
        },
      },
    };
    const output = flatten(input);
    const expected = {
      __nodes__: {
        660361306: {
          id: '660361306',
          name: 'Greg',
        },
      },
      data: {
        viewer: {
          id: '660361306',
        },
      },
    };
    expect(output).toEqual(expected);
  });

  it('merges node data into normalized form', () => {
    const input = {
      data: {
        viewer: {
          id: '660361306',
          name: 'Greg',
          publicPersona: {
            id: '660361306',
            name: 'Greg',
            email: 'greg@hurrell.net',
          },
        },
      },
    };
    const output = flatten(input);
    const expected = {
      __nodes__: {
        660361306: {
          email: 'greg@hurrell.net',
          id: '660361306',
          name: 'Greg',
          publicPersona: {
            id: '660361306',
          },
        },
      },
      data: {
        viewer: {
          id: '660361306',
        },
      },
    };
    expect(output).toEqual(expected);
  });

  it('processes a result containing null', () => {
    const input = {
      data: {
        person: {
          affiliation: null,
          name: 'Greg',
          size: 10,
        },
      },
    };
    const output = flatten(input);
    const expected = {
      __nodes__: {},
      data: {
        person: {
          affiliation: null,
          name: 'Greg',
          size: 10,
        },
      },
    };
    expect(output).toEqual(expected);
  });
});
