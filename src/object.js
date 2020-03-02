"use strict"
/*
 * Object Helpers
 *
 * @exports my.object
 */
const my = module.exports
const { isAtom } = require("./any")

/* Creation */

/**
 * Create a new object with **prototype** and **properties**.
 */
my.wrap = function (prototype, properties) {
  const object = Object.create(prototype)
  if (properties) Object.assign(object, properties)
  return object
}

/**
 * Returns a new **object** whose object values are inherited.
 */
my.extend = function (object) {
  return my.objectMap(object, value => {
    return isAtom(value) ? value : Object.create(value)
  })
}

/**
 * Une fonction qui génère un object à partir d'une liste de clefs et d'une
 * fonction qui retourne une valeur pour chaque clef.
 */
my.associate = function (keys, func) {
  const object = {}
  keys.forEach(key => object[key] = func(key))
  return object
}

/* Mutation */

/**
 * Create a new object with the same properties than **object** but whose values
 * have been transformed by **func**.
 *
 * TODO: make it a xmap
 */
my.objectMap = function (object, func) {
  const keys = Object.keys(object)
  return my.associate(keys, key => func(object[key], key))
}

/**
 * Merge **properties** with **object**.
 */
my.weave = function (object, properties) {
  Object.keys(properties).forEach(key => {
    if (isAtom(object[key]) || isAtom(properties[key])) {
      object[key] = properties[key]
    } else {
      Object.assign(object[key], properties[key])
    }
  })
}
