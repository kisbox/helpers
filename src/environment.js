"use strict"
/**
 * Informations and helpers related to the contextual environment.
 *
 * @exports environment
 */
const my = exports

/**
 * `true` if we are running in a browser, `false` otherwise.
 *
 * @member {Boolean}
 */
my.isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined"

/**
 * `true` if we are running in Node.js, `false` otherwise.
 *
 * @member {Boolean}
 */
my.isNode =
  typeof process !== "undefined" && process.versions && process.versions.node

/**
 * `true` if the current page is embedded (in a browser window), `false`
 * otherwise.
 *
 * @member {Boolean}
 */
my.isEmbedded = my.isBrowser && window.self !== window.top

/**
 * This require only takes effect in Node.js environment, and is ignored by
 * code bundlers. This is meant to prevent bundling of dependencies that are not
 * relevant to browser environments.
 *
 * @function
 * @param {String} path - A path to the file to load, same as Node.js `require`.
 */
my.nodeRequire = my.isBrowser ? () => {} : eval("require")
