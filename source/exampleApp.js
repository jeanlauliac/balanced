var Account = require('./Account')
var Application = require('./Application')
var Currency = require('./Currency')
var Expense = require('./Expense')
var Immutable = require('immutable')
var Person = require('./Person')
var Report = require('./Report')

var namesString =
`Olga Hammes
Maynard Lietz
Hedwig Vierling
Alvin Mohammed
Dara Hermanson
Demarcus Buckner
Marylouise Hamman
Willie Gahagan
Eneida Doiron
Sung Kukowski
Reda Johns
Bryan Bagdon
Altagracia Deans
Chang Cryan
Michell Benavente
Carmen Vizcarra
Kymberly Bozell
Mikel Beckel
Jami Cronkhite
Carmelo Lossett`

var names = namesString.split('\n')

function exampleApp() {
  return new Application({
    account: new Account({
      reports: new Immutable.Map([
        ['1', new Report({
          currency: Currency.EUR,
          expenses: new Immutable.Map([
            ['10', new Expense({
              benefiters: new Immutable.Set(['2', '3']),
              payer: '2',
              reason: 'Gas',
              value: 54.3,
            })],
            ['11', new Expense({
              benefiters: new Immutable.Set(['1', '2', '3']),
              payer: '2',
              reason: 'Lunch Sat',
              value: 18.5,
            })],
            ['12', new Expense({
              benefiters: new Immutable.Set(['1', '2', '3']),
              payer: '3',
              reason: 'Museum',
              value: 21,
            })],
            ['13', new Expense({
              benefiters: new Immutable.Set(['1', '2']),
              payer: '1',
              reason: 'Something else',
              value: 12,
            })],
          ]),
          people: new Immutable.Set(['1', '2', '3']),
          title: 'Road Trip'
        })],
      ]),
    }),
    people: new Immutable.Map(
      names
        .map((name) => Person.named(name))
        .map((v, i) => [(i + 1).toString(), v])
    ),
  })
}

module.exports = exampleApp
