'use strict'

var Immutable = require('immutable')
var invariant = require('./invariant')

class Person extends Immutable.Record({
  name: null,
}) {}

Person.named = (name) => {
  return new Person({ name })
}

module.exports = Person
