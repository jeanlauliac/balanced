'use strict'

var Immutable = require('immutable')
var invariant = require('./invariant')

var Person = {
  Record: new Immutable.Record({
    name: null,
  }, 'Person'),

  named(name) {
    return new Person.Record({ name })
  },
}

module.exports = Person
