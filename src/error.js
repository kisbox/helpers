"use strict"
/**
 * Error-related helpers
 *
 * @exports my.error
 **/
const my = exports

/* Executes **thunk** and redirects errors to `console.error`.
 *
 * @param {Function} thunk - A function that takes no argument.
 */
my.noThrow = function (thunk) {
  try {
    return thunk()
  } catch (error) {
    console.error(error)
    return error
  }
}

/* Executes **thunk** and ignore errors.
 *
 * @param {Function} thunk - A function that takes no argument.
 */
my.noError = function (thunk) {
  try {
    return thunk()
  } catch (error) {
    null
  }
}
