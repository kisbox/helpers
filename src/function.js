"use strict"
/*
 * Function-related helpers
 *
 * @exports function
 */
const my = exports

const { isAtom, isArrayLike } = require("./any")

/* Library */

/**
 * Pass _rule_ to **callback**, where _rule_ is either **key** in **rules** or
 * `*` in **rules**. If no _rule_ is found, do nothing.
 */
my.dispatch = function (rules, key, callback) {
  const rule = rules[key] || rules["*"]
  if (rule) return callback(rule)
}

/*
 * Returns **value1** when not `undefined`, else **value2**.
 */
my.either = function (value1, value2) {
  return value1 === undefined ? value2 : value1
}

/**
 * Takes **any** object, apply **func** to it if it is an atom, or apply
 * **func** to each of its elements if it is a composite object.
 *
 * @param {Any} any
 * @param {Function} callback
 **/
my.xeach = function (any, callback) {
  if (any == null) {
    return
  } else if (isAtom(any)) {
    callback(any, "atom")
  } else if (typeof any.forEach === "function") {
    any.forEach(callback)
  } else if (isArrayLike(any)) {
    Array.prototype.forEach.call(any, callback)
  } else {
    Object.entries(any).forEach(([key, value]) => {
      callback(value, key)
    })
  }
}

/**
 * Takes **any** object, apply **function** and returns an _Array_.
 *
 * @param {*} any
 * @param {Function} callback
 * @return {Array}
 **/
my.xmap = function (any, callback) {
  const array = []
  my.xeach(any, (value, key) => {
    array.push(callback(value, key))
  })
  return array
}

/**
 * Takes **any** object, apply **function** and returns an _Object_.
 *
 * @param {*} any
 * @param {Function} callback
 * @return {Object}
 **/
my.xassoc = function (any, callback) {
  const object = {}
  my.xeach(any, (value, key) => {
    const returned = callback(value, key)
    if (returned !== undefined) object[key] = returned
  })
  return object
}
