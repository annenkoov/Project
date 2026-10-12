const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

let interactions;
try {
  interactions = require('../interactions.js');
} catch {
  interactions = {};
}

test('excuse generator never repeats the previous line', () => {
  assert.equal(typeof interactions.createExcusePicker, 'function', 'createExcusePicker must be exported');
  const pick = interactions.createExcusePicker(['one', 'two', 'three'], () => 0);
  const results = [pick(), pick(), pick()];
  assert.equal(results[0], 'one');
  assert.notEqual(results[1], results[0]);
  assert.notEqual(results[2], results[1]);
});

test('match diagnosis changes with the selected situation', () => {
  assert.equal(typeof interactions.diagnoseMatch, 'function', 'diagnoseMatch must be exported');
  assert.notEqual(interactions.diagnoseMatch('draft'), interactions.diagnoseMatch('support'));
  assert.equal(interactions.diagnoseMatch('unknown'), 'Выбирай версию — Ярослав уже подготовил три.');
});

test('confidence meter has a joke for each level', () => {
  assert.equal(typeof interactions.getConfidenceCaption, 'function', 'getConfidenceCaption must be exported');
  assert.notEqual(interactions.getConfidenceCaption(10), interactions.getConfidenceCaption(90));
});

test('all customer contact links open Yaroslav Telegram', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const links = [...html.matchAll(/<a\b(?=[^>]*\bdata-contact-yaroslav\b)[^>]*\bhref="([^"]+)"[^>]*>/g)];
  assert.ok(links.length >= 6, 'at least six contact actions should be available across the page');
  assert.ok(links.every(([, href]) => href === 'https://t.me/unknessl'), 'contact actions must all point to @unknessl');
});
