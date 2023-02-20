'use strict';

const url = require('..');
const assert = require('assert').strict;

assert.strictEqual(url(), 'Hello from url');
console.info('url tests passed');
