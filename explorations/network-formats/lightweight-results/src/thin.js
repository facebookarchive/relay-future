'use strict';

import 'babel-core/polyfill';

/**
 * Flattened data format like that produced by the `flatten` module, but with
 * some additional corners cut to reduce size (for example, normalized records
 * don't redundantly encode their own IDs).
 */
export default function thin(results) {
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
      if (key !== 'id') {
        result[key] = item;
      }
    }
  });
}
