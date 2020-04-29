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
