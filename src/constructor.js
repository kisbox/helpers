"use strict"
/**
 * Constructor-related helpers
 *
 * @exports constructor
 */
const my = module.exports

const { decontextualize } = require("./prototype")
const { $memoizer } = require("./meta")
const { wrap } = require("./object")

/**
 * Transmet les méthodes décontextualisée au constructeur, et les retourne.
 * @deprecated
 */
my.generalize = function (constructor) {
  const root = decontextualize(constructor.prototype)
  Object.assign(constructor, root)
  return root
}

/**
 * Returns the decontextualized methods of a constructor.
 *
 * @example
 * const { hasOwnProperty } = call(Object)
 *
 * const foo = { bar: 123 }
 * hasOwnProperty(foo, "bar")        // => true
 * hasOwnProperty(foo, "baz")        // => false
 *
 * @param {Constructor} constructor
 * @return Object
 */
my.call = $memoizer("/call/", (constructor) => {
  const parent = Object.getPrototypeOf(constructor)
  const parentCalls = parent ? my.call(parent) : null
  const { prototype } = constructor
  const constructorCalls = prototype && decontextualize(prototype)
  return wrap(parentCalls, constructorCalls)
})
