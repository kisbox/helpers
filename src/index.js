"use strict"
/**
 * **Kisbox helpers** is a collection of independent functions that are required
 * by other @kisbox libraries.
 *
 * External organizations can re-use this code by requiring this library,
 * and leverage `helpers.extend()` to prevent name clashing.
 */
const { weave, wrap } = require("./object")
const { isObject } = require("./any")

/* Helpers */
const helpers = {
  $meta: require("./meta"),
  any: require("./any"),
  constructor: require("./constructor"),
  environment: require("./environment"),
  error: require("./error"),
  function: require("./function"),
  object: require("./object"),
  promise: require("./promise"),
  property: require("./property"),
  prototype: require("./prototype")
}

/* Utilities */
const my = {}

/**
 * Returns an _Helpers_ instance that provides **helpers**.
 *
 * @example
 * helpers.new({
 *  array: require("./array")
 * })
 *
 * @param {Object} [helpers] - Initial helpers.
 */
my.new = function (helpers) {
  const raw = Object.create(my)
  return helpers ? raw.import(helpers) : raw
}

/**
 * Adds **helpers** to an _Helpers_ instance.
 *
 * @example
 * helpers.import({
 *  array: require("./array")
 * })
 *
 * @param {Object} [helpers] - Additional helpers.
 */
my.import = function (helpers) {
  weave(this, helpers)
  return this
}

/**
 * Extend an _Helpers_ instance with **helpers**.
 *
 * @example
 * helpers.extend({
 *  array: require("./array")
 * })
 *
 * @param {Object} [helpers] - Helpers extension.
 */
my.extend = function (helpers) {
  const extended = wrap(this)

  Object.keys(extended).forEach((key) => {
    if (isObject(extended[key])) {
      extended[key] = wrap(helpers[key])
    }
  })

  if (helpers) {
    extended.import(helpers)
  }

  return extended
}

/* Export */
module.exports = my.new(helpers)
