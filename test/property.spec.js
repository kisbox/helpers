/* eslint-env jasmine */
"use strict"

const my = require("../src/property")

/* Specs */

describe("my.property", () => {
  let object
  beforeEach(() => object = { foo: "bar" })

  describe("setProperty()", () => {
    it("sets property flags to `true`", () => {
      my.setProperty(object, "baz", { value: true })

      expect(object).toEqual({ foo: "bar", baz: true })
      expectWritable(object, "baz")
      expectConfigurable(object, "baz")
    })

    it("preserves previous value & flags", () => {
      my.setProperty(object, "foo")

      expect(object).toEqual({ foo: "bar" })
      expectWritable(object, "foo")
      expectConfigurable(object, "foo")
    })
  })

  describe("hide()", () => {
    it("makes a property non-enumerable", () => {
      const parent = Object.create(object)
      my.hide(parent, "foo")

      expect(parent).toEqual({})
      expect(object).toEqual({ foo: "bar" })

      my.hide(object, "foo")

      expect(object).toEqual({})
      expectWritable(object, "foo")
      expectConfigurable(object, "foo")
    })

    it("creates a non-enumerable property", () => {
      my.hide(object, "baz", true)

      expect(object).toEqual({ foo: "bar" })
      expect(object.baz).toBe(true)
      expectWritable(object, "baz")
      expectConfigurable(object, "baz")
    })
  })

  describe("lock()", () => {
    it("makes a property read-only", () => {
      my.lock(object, "foo")

      expect(object).toEqual({ foo: "bar" })
      expectNonWritable(object, "foo")
      expectNonConfigurable(object, "foo")
    })

    it("creates a read-only property", () => {
      my.lock(object, "baz", true)

      expect(object).toEqual({ foo: "bar", baz: true })
      expectNonWritable(object, "baz")
      expectNonConfigurable(object, "baz")
    })
  })

  describe("hideLock()", () => {
    it("makes a property read-only, non-enumerable", () => {
      my.hideLock(object, "foo")

      expect(object).toEqual({})
      expectNonWritable(object, "foo")
      expectNonConfigurable(object, "foo")
    })

    it("creates a read-only, non-enumerable property", () => {
      my.hideLock(object, "baz", true)

      expect(object).toEqual({ foo: "bar" })
      expectNonWritable(object, "baz")
      expectNonConfigurable(object, "baz")
    })
  })
})

/* Helpers */

function expectWritable (object, key) {
  expect(() => object[key] = null).not.toThrow()
}

function expectNonWritable (object, key) {
  expect(() => object[key] = null).toThrow()
}

function expectConfigurable (object, key) {
  expect(() =>
    my.setProperty(object, key, { configurable: true })
  ).not.toThrow()
}

function expectNonConfigurable (object, key) {
  expect(() => my.setProperty(object, key, { configurable: true })).toThrow()
}
