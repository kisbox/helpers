"use strict"
/**
 * Helpers related to meta-programming
 *
 * @todo Reword names (trait, mark, sideScope, sideClass, utility)
 *
 * @exports $meta
 * */
const my = exports
const { hasOwn, hide } = require("./property")

/**
 * Encapsulated _Symbol_ + base utilities.
 **/
my.$tag = function (name = "/tag/") {
  const symbol = Symbol(name)
  return {
    get: target => target[symbol],
    set: (target, value) => hide(target, symbol, value),
    isIn: target => !!target[symbol],
    isOn: target => hasOwn(target, symbol)
  }
}

/**
 * Une fonction qui sauvegarde le résultat d'une computation pour un object
 * donné.
 *
 * @param {String} [name=memoized] - Name of the $memoizer symbol.
 * @param {Function} [generator] - The computation to perform on targets.
 */
my.$memoizer = function (
  name = "/memoized/",
  generator = () => Object.create(null)
) {
  const $tag = my.$tag(name)

  const accessor = function (target) {
    if (!$tag.isOn(target)) $tag.set(target, generator(target))
    return $tag.get(target)
  }

  Object.assign(accessor, $tag)
  return accessor
}

my.$util = function (name = "/utility/", methods = {}) {
  const constructor = methods.constructor || function () {}
  // const constructor = methods.constructor ? methods.constructor :
  constructor.prototype = methods
  return my.$memoizer(name, target => new constructor(target))
}

/**
 * SideScope is a memoizer.
 **/
my.$sideScope = function (name = "/sideScope/", prototype) {
  const accessor = my.$memoizer(name, object => {
    const proto = Object.getPrototypeOf(object)
    const inherited = accessor(proto)
    const returned = Object.create(inherited)

    // TODO: possible extension
    //     if (typeof prototype === "function") {
    //       Object.assign(returned, prototype(object))
    //     }

    return returned
  })

  // Root SideScope.
  accessor.set(Object.prototype, prototype || Object.create(null))

  return accessor
}

my.$sideClass = function (name = "/sideClass/", constructor) {
  return my.$sideScope(name, constructor.prototype)
}
