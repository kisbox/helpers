"use strict"
/**
 * Constructor-related helpers
 *
 * @exports constructor
 */
const my = module.exports

const { decontextualize } = require("./prototype")
const { $memoizer } = require("./meta")

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
 * Une fonction qui retourne un SuperScope contenant les méthodes
 * dé-contextualisées du prototype d'un constructeur.
 *
 * @example
 * call(Array).map([2, 3], x => x * 2) // => [4, 6]
 *
 * @todo Move it to utils?
 */
my.call = $memoizer("/call/", (constructor) => {
  return decontextualize(constructor.prototype)
})
