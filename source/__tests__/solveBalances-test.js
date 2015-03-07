jest.dontMock('immutable')
jest.dontMock('../invariant')
jest.dontMock('../solveBalances')

import Immutable from 'immutable'
import solveBalances from '../solveBalances'

describe('solveBalances', () => {
  it('finds the best transactions', () => {
    var balances = new Immutable.Map([
      ['1', 23], ['2', -15], ['3', -18], ['4', 10]
    ])
    var transactions = solveBalances(balances)
    expect(transactions.toArray()).toEqual([
      { from: '2', to: '4', value: 10 },
      { from: '2', to: '1', value: 5 },
      { from: '3', to: '1', value: 18 }
    ])
  })
})
