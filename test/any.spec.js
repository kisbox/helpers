/* eslint-env jasmine */
"use strict"

const { isArrayLike, isAtom, isInstance } = require("../src/any")

/* Data */
const array = []
const boolean = true
const date = new Date()
const map = new Map()
const number = 123
const object = {}
const set = new Set()
const string = "abc"

/* Specifications */

describe("isArrayLike()", () => {
  it("returns `true` for an array", () => {
    expect(isArrayLike([])).toBe(true)
  })

  it("returns `true` for arguments", function () {
    expect(isArrayLike(arguments)).toBe(true)
  })

  it("returns `false` for other objects", () => {
    expect(isArrayLike(boolean)).toBe(false)
    expect(isArrayLike(map)).toBe(false)
    expect(isArrayLike(null)).toBe(false)
    expect(isArrayLike(number)).toBe(false)
    expect(isArrayLike(object)).toBe(false)
    expect(isArrayLike(set)).toBe(false)
    expect(isArrayLike(string)).toBe(false)
    expect(isArrayLike(undefined)).toBe(false)
  })
})

describe("isAtom()", () => {
  it("returns `true` for non-composite objects", () => {
    expect(isAtom(boolean)).toBe(true)
    expect(isAtom(date)).toBe(true)
    expect(isAtom(null)).toBe(true)
    expect(isAtom(number)).toBe(true)
    expect(isAtom(string)).toBe(true)
    expect(isAtom(undefined)).toBe(true)
  })

  it("returns `false` for composite objects", () => {
    expect(isAtom(array)).toBe(false)
    expect(isAtom(map)).toBe(false)
    expect(isAtom(object)).toBe(false)
    expect(isAtom(set)).toBe(false)
  })
})

describe("isInstance", () => {
  it("returns `true` when argument is instance of a class", () => {
    expect(isInstance(array)).toBe(true)
    expect(isInstance(boolean)).toBe(true)
    expect(isInstance(date)).toBe(true)
    expect(isInstance(map)).toBe(true)
    expect(isInstance(number)).toBe(true)
    expect(isInstance(object)).toBe(true)
    expect(isInstance(set)).toBe(true)
    expect(isInstance(string)).toBe(true)

    class Extension extends Object {}
    expect(isInstance(new Extension())).toBe(true)
  })

  it("returns `false` when argument is a constructor", () => {
    expect(isInstance(Array)).toBe(false)
    expect(isInstance(Date)).toBe(false)
    expect(isInstance(Object)).toBe(false)
    expect(isInstance(String)).toBe(false)

    class Extension extends Object {}
    expect(isInstance(Extension)).toBe(false)
  })
})
