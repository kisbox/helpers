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
    any
    && typeof any[Symbol.iterator] === "function"
    && typeof any.length === "number"
    && typeof any !== "string"
  )
}

my.isObject = function (any) {
  return any !== null && typeof any === "object"
}
