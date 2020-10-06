"use strict"
/**
 * Properties-related helpers
 *
 * @todo Sane handler of property defaults
 * @exports property
 */
const my = exports

const { either } = require("./function")
const { wrap } = require("./object")

/* Introspection */

my.hasOwn = function (object, key) {
  return Object.prototype.hasOwnProperty.call(object, key)
}

/* Configuration */

my.hide = function (object, key, value) {
  const flags = { enumerable: false }
  if (arguments.length === 3) flags.value = value
  my.setProperty(object, key, flags)
}

my.lock = function (object, key, value) {
  const flags = { writable: false, configurable: false }
  if (arguments.length === 3) flags.value = value
  my.setProperty(object, key, flags)
}

my.hideLock = function (object, key, value) {
  const flags = { writable: false, enumerable: false, configurable: false }
  if (arguments.length === 3) flags.value = value
  my.setProperty(object, key, flags)
}

my.setProperty = function (object, key, params = {}) {
  if (key in object) {
    // Property exists, `undefined` flags retains current values.
    if (!("value" in params || "set" in params || "get" in params)) {
      params = Object.create(params)
      params.value = object[key]
    }
    Object.defineProperty(object, key, params)
  } else {
    // Property doesn't exist: only unset requested flags.
    const flags = wrap(params, {
      enumerable: either(params.enumerable, true),
      configurable: either(params.configurable, true)
    })

    if (!("get" in params || "set" in params)) {
      flags.writable = either(params.writable, true)
    }

    Object.defineProperty(object, key, flags)
  }
}

/* Applications */

/**
 * Retarde l'évaluation de la valeur de **key** au moment de la lecture.
 * TODO: make it work on prototypes
 */
my.delay = function (object, key, thunk) {
  Object.defineProperty(object, key, {
    configurable: true,
    get: function () {
      delete this[key]
      return this[key] = thunk.call(this)
    },
  })
}
