#!/usr/bin/env node
/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

'use strict';

import 'babel-core/polyfill';

import Table from 'cli-table';
import arrayrefize from './arrayrefize';
import deleonize from './deleonize';
import demessagepackize from './demessagepackize';
import flatten from './flatten';
import gzip from 'gzip-js';
import leonize from './leonize';
import messagepackize from './messagepackize';
import now from 'performance-now';
import passthrough from './passthrough';
import thin from './thin';

const fixture = require('../fixtures/result');
const baseSize = JSON.stringify(fixture).length;

let tests = [
  [
    'passthrough',
    () => JSON.stringify(passthrough(fixture)),
    payload => JSON.parse(payload),
  ],
  [
    'messagepackize',
    () => messagepackize(fixture),
    payload => demessagepackize(payload),
  ],
  [
    'leonize',
    () => leonize(fixture),
    payload => deleonize(payload),
  ],
  [
    'flatten',
    () => JSON.stringify(flatten(fixture)),
    null,
  ],
  [
    'flatten + messagepackize',
    () => messagepackize(flatten(fixture)),
    null,
  ],
  [
    'thin',
    () => JSON.stringify(thin(fixture)),
    null,
  ],
  [
    'thin + messagepackize',
    () => messagepackize(thin(fixture)),
    null,
  ],
  [
    'arrayrefize',
    () => JSON.stringify(arrayrefize(fixture)),
    null,
  ],
  [
    'arrayrefize + messagepackize',
    () => messagepackize(arrayrefize(fixture)),
    null,
  ],
];

function pretty(object) { // eslint-disable-line no-unused-vars
  console.log(JSON.stringify(object, null, 2));
}

// Add three copies of each test, applying three levels of gzip compression.
tests = tests.reduce((tests, test) => {
  tests.push(test);
  [1, 6, 9].forEach(level => {
    const [op, encoder, decoder] = test;
    tests.push([
      `${op} + gzip(${level})`,
      () => gzip.zip(encoder(), {level}),
      null, // Not decoding due to buggy JS gunzip impementations.
    ]);
  });
  return tests;
}, []);

function print(str) {
  process.stdout.write(str);
}

const table = new Table({
  head: ['op', 'size', '%', 'time', 'reverse'],
});

tests.forEach(([op, encoder, decoder]) => {
  print(op + ': ');
  const result = encoder();

  // Encoding.
  let before = now();
  for (let i = 0; i < 100; i++) {
    encoder();
    if (i % 10 === 0) {
      print('.');
    }
  }
  const encodingTime = now() - before;

  // Decoding.
  let decodingTime = NaN;
  if (decoder) {
    before = now();
    for (let i = 0; i < 100; i++) {
      if (decoder) {
        decoder(result);
      }
      if (i % 10 === 0) {
        print('.');
      }
    }
    decodingTime = now() - before;
  }

  print('\n');
  table.push([
    op,
    result.length,
    (result.length / baseSize * 100).toFixed(2) + '%',
    encodingTime.toFixed(2) + 'ms',
    isNaN(decodingTime) ? 'n/a' : decodingTime.toFixed(2) + 'ms',
  ]);
});

console.log(table.toString());
