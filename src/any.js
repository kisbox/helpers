"use strict"
/**
 * Helpers for objects whose type is unknown.
 *
 * @exports any
 * */
const my = exports

/* Tests: types */
my.isArray = function (any) {
  return Array.isArray(any)
}

my.isArrayLike = function (any) {
  // https://stackoverflow.com/a/55080450
  return (
    any
    && typeof any[Symbol.iterator] === "function"
    && typeof any.length === "number"
    && typeof any !== "string"
  )
}

my.isFunction = function (any) {
  return typeof any === "function"
}

my.isPromise = function (any) {
  return any && typeof any === "object" && typeof any.then === "function"
}

my.isObject = function (any) {
  return any !== null && typeof any === "object"
}

/* Tests: qualities */
my.isAtom = function (any) {
  return any === null || typeof any !== "object"
}
