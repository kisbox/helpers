"use strict"
/**
 * Promise-related helpers
 *
 * @exports promise
 */
const my = exports

/**
 * Return a promise that takes `x` milliseconds to resolve.
 *
 * @async
 * @param {Number} delay - Delay, in milliseconds.
 */
my.timeout = function (delay) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

/**
 * If array contains one or more Promise, returns once each Promise is resolved.
 * Else, returns immediately.
 *
 * @param {Array}
 **/
my.sync = function (array) {
  if (array.find((x) => x instanceof Promise)) {
    return Promise.allSettled(array).then(() => undefined)
  }
}
