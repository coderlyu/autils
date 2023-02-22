'use strict';

const directive = require('..');
const assert = require('assert').strict;

assert.strictEqual(directive(), 'Hello from directive');
console.info('directive tests passed');
