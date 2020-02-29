"use strict"
/*
 * Function-related helpers
 *
 * @exports function
 */
const my = exports

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
