"use strict"
/**
 * Prototype-related helpers
 *
 * @exports prototype
 */
const my = exports
const { associate } = require("./object")

/**
 * Accepte un prototype et retourne ses méthodes de-contextualisées.
 */
my.decontextualize = function (prototype) {
  const keys = Object.getOwnPropertyNames(prototype)
  const methods = keys.filter((key) => typeof prototype[key] === "function")

  // TODO: find a more efficient way?
  const wrapper = associate(methods, (key) => {
    const wrapped = prototype[key]
    return function () {
      const context = Array.prototype.shift.call(arguments)
      return wrapped.apply(context, arguments)
    }
  })

  delete wrapper.constructor
  return wrapper
}
