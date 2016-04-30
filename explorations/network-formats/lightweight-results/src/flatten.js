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
 * Simple (minimal) flattened data format inspired by JSON Graph.
 *
 * Considers any object with an "id" subfield to be suitable for hoisting up to
 * the top level were it can be normalized.
 *
 * For example, given this result data as input:
 *
 *     {
 *       data: {
 *         viewer: {
 *           id: '660361306',
 *           name: 'Greg',
 *           publicPersona: {
 *             id: '660361306',
 *             name: 'Greg',
 *             email: 'greg@hurrell.net',
 *           },
 *         },
 *       },
 *     }
 *
 * it produces this output:
 *
 *     {
 *       __nodes__: {
 *         660361306: {
 *           email: 'greg@hurrell.net',
 *           id: '660361306',
 *           name: 'Greg',
 *           publicPersona: {
 *             id: '660361306',
 *           },
 *         },
 *       },
 *       data: {
 *         viewer: {
 *           id: '660361306',
 *         },
 *       },
 *     }
 *
 * Note that there is some overhead in encoding the data in this way, however,
 * as the size and internal redundancy of a result increases the overhead should
 * be ameliorated.
 *
 * For other examples, see the tests.
 *
 * @see https://netflix.github.io/falcor/documentation/jsongraph.html
 */
export default function flatten(results) {
  const store = {
    __nodes__: {},
    data: {},
  };
  pack(results.data, store.data, store.__nodes__);
  return store;
}

/**
 * Pack `data` into `result`, using `nodes` to store normalizable portions.
 */
function pack(data, result, nodes) {
  Object.keys(data).forEach(key => {
    const item = data[key];
    if (item && typeof item === 'object') {
      const id = item.id;
      if (id != null) {
        // Node object. Store it in normalized form.
        if (!nodes[id]) {
          nodes[id] = {};
        }
        if (!result[key]) {
          result[key] = {id};
        }
        pack(item, nodes[id], nodes);
      } else {
        // Non-node object. Continue traversing, writing recursively.
        result[key] = {};
        pack(item, result[key], nodes);
      }
    } else {
      // Is scalar, or null.
      result[key] = item;
    }
  });
}
