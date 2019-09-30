/* eslint-env jasmine */
"use strict"

const my = require("../src/property")

/* Specs */

describe("my.property", () => {
  let object
  beforeEach(() => object = { foo: "bar" })

  describe("hide()", () => {
    it("makes a property non-enumerable", () => {
      expect(Object.keys(object)).toEqual(["foo"])
      my.hide(object, "foo")
      expect(Object.keys(object)).toEqual([])
    })

    it("creates non-enumerable properties", () => {
      my.hide(object, "baz", true)
      expect(Object.keys(object)).toEqual(["foo"])
      expect(object.baz).toBe(true)

      // Properties created this way are intended to be writable, configurable.
      expect(() => object.baz = false).not.toThrow()
      expect(() => my.hide(object, "baz")).not.toThrow()
    })
  })
})
