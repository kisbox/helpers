"use strict"
/*
 * Function-related helpers
 *
 * @exports function
 */
const my = exports

/**
 * Applique la règle **key** ou la règle par défault `*` à **value**. Si aucune
 * des deux règles n'est disponible, retourne `undefined`.
 */
my.dispatch = function (value, key, rules) {
  const rule = rules[key] || rules["*"]
  if (rule) return rule(value)
}

/*
 * Returns **value1** when not `undefined`, else **value2**.
 */
my.either = function (value1, value2) {
  return value1 === undefined ? value2 : value1
}
