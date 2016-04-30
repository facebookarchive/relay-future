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
 * Like `flatten`, but instead of using fat pointers into a map, uses
 * lightweight indices into an array.
 */
export default function arrayrefize(results) {
  const indexMap = {};
  const store = {
    __nodes__: [],
    data: {},
  };
  pack(results.data, store.data, store.__nodes__, indexMap);
  return store;
}

/**
 * Pack `data` into `result`, using `nodes` to store normalizable portions.
 *
 * `nodes` is an array, and `indexMap` is used to decide where in the array to
 * store the node.
 */
function pack(data, result, nodes, indexMap) {
  Object.keys(data).forEach(key => {
    const item = data[key];
    if (item && typeof item === 'object') {
      const id = item.id;
      if (id != null) {
        // Node object. Store it in normalized form.
        const index =
          indexMap[id] != null ?
          indexMap[id] :
          (indexMap[id] = nodes.length);
        if (!nodes[index]) {
          nodes[index] = {};
        }
        if (!result[key]) {
          result[key] = {id: index};
        }
        pack(item, nodes[index], nodes, indexMap);
      } else {
        // Non-node object. Continue traversing, writing recursively.
        result[key] = {};
        pack(item, result[key], nodes, indexMap);
      }
    } else {
      // Is scalar, or null.
      result[key] = item;
    }
  });
}
