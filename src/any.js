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
  return typeof any !== "object"
}
