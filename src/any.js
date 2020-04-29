"use strict"
/**
 * Helpers for objects whose type is unknown.
 *
 * @exports any
 * */
const my = exports

my.isArrayLike = function (any) {
  // https://stackoverflow.com/a/55080450
  return (
    !!any
    && typeof any[Symbol.iterator] === "function"
    && typeof any.length === "number"
    && typeof any !== "string"
  )
}

my.isAtom = function (any) {
  return any === null || typeof any !== "object" || any instanceof Date
}

/**
 * Returns whether **any** is the instance of a class.
 *
 * @param {Any} any
 * @return {Boolean}
 */
my.isInstance = function (any) {
  return !(any.prototype && any.prototype.constructor === any)
}
