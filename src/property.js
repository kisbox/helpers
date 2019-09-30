"use strict"
/**
 * Properties-related helpers
 *
 * @todo Sane handler of property defaults
 * @exports property
 */
const my = exports

const { either } = require("./function")

/* Introspection */

my.hasOwn = function (object, key) {
  return Object.prototype.hasOwnProperty.call(object, key)
}

/* Configuration */

my.hide = function (object, key, value) {
  my.setProperty(object, key, {
    value,
    enumerable: false
  })
}

my.lock = function (object, key, value) {
  my.setProperty(object, key, {
    value,
    writable: false,
    configurable: false
  })
}

my.hideLock = function (object, key, value) {
  my.setProperty(object, key, {
    value,
    writable: false,
    enumerable: false,
    configurable: false
  })
}

my.setProperty = function (object, key, params) {
  if (key in object) {
    // Property exists, `undefined` flags retains current values.
    Object.defineProperty(object, key, {
      value: either(params.value, object[key]),
      writable: params.writable,
      enumerable: params.enumerable,
      configurable: params.configurable
    })
  } else {
    // Property doesn't exist: only unset requested flags.
    Object.defineProperty(object, key, {
      value: params.value,
      writable: either(params.writable, true),
      enumerable: either(params.enumerable, true),
      configurable: either(params.configurable, true)
    })
  }
}

/* Applications */

/**
 * Retarde l'évaluation de la valeur de **key** au moment de la lecture.
 */
my.delay = function (object, key, thunk) {
  Object.setProperties(object, key, {
    get: () => {
      object[key] = thunk()
      return object[key]
    }
  })
}
