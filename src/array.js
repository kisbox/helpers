"use strict"
/**
 * Array-related helpers
 *
 * @exports array
 * */
const my = exports

/**
 * Remove `target` from `array`.
 *
 * @param {Array} array
 * @param {*} target
 * */
my.remove = function (array, target) {
  array.forEach((item, index) => {
    if (item === target) {
      array.splice(index, 1)
    }
  })
}
