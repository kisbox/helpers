/* eslint-env jasmine */
"use strict"

const { xeach, xmap, xassoc } = require("../src/function")

/***** Cross-Iterators *****/

/* Data */
const boolean = true
const func = () => {}
const number = 123
const string = "foo"

const atoms = [boolean, func, number, string]

const composites = [
  {
    type: "array",
    data: ["foo", "bar", "baz"],
    keys: [0, 1, 2],
    values: ["foo", "bar", "baz"],
    map: ["xfoo", "xbar", "xbaz"],
    assoc: { 0: "xfoo", 1: "xbar", 2: "xbaz" }
  },
  {
    type: "object",
    data: { one: "foo", two: "bar", three: "baz" },
    keys: ["one", "two", "three"],
    values: ["foo", "bar", "baz"],
    map: ["xfoo", "xbar", "xbaz"],
    assoc: { one: "xfoo", two: "xbar", three: "xbaz" }
  }
]

function addArgumentsType () {
  composites.push({
    type: "arguments",
    data: arguments,
    keys: [0, 1, 2],
    values: Array.from(arguments),
    map: ["xfoo", "xbar", "xbaz"],
    assoc: { 0: "xfoo", 1: "xbar", 2: "xbaz" }
  })
}
addArgumentsType("foo", "bar", "baz")

/* Specs */

describe("my.function", () => {
  describe("xeach()", () => {
    it("applies callback to atoms, using \"atom\" as index", () => {
      atoms.forEach(atom => {
        xeach(atom, expectVK(atom, "atom"))
      })
    })

    it("iterates over composites", () => {
      composites.forEach(item => {
        const keys = []
        const values = []

        xeach(item.data, (value, key) => {
          keys.push(key)
          values.push(value)
        })

        expect(keys).toEqual(item.keys)
        expect(values).toEqual(item.values)
      })
    })
  })

  describe("xmap()", () => {
    it("maps atoms", () => {
      atoms.forEach(atom => {
        const map = xmap(atom, value => `x${value}`)
        expect(map).toEqual([`x${String(atom)}`])
      })
    })

    it("maps composites", () => {
      composites.forEach(item => {
        const map = xmap(item.data, value => `x${value}`)
        expect(map).toEqual(item.map)
      })
    })
  })

  describe("xassoc()", () => {
    it("associates atoms", () => {
      atoms.forEach(atom => {
        const object = xassoc(atom, value => `x${value}`)
        expect(object).toEqual({ atom: `x${String(atom)}` })
      })
    })

    it("associates composites", () => {
      composites.forEach(item => {
        const object = xassoc(item.data, value => `x${value}`)
        expect(object).toEqual(item.assoc)
      })
    })
  })
})

/* Helper */

function expectVK (expectedValue, expectedKey) {
  return (actualValue, actualKey) => {
    expect(actualValue).toBe(expectedValue)
    expect(actualKey).toBe(expectedKey)
  }
}
