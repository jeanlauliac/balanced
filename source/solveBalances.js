import Immutable from 'immutable'
import invariant from './invariant'

/**
 * Given a map of IDs to their respective balances, finds the reconciliation
 * transactions so that the balances come down to zero.
 */
function solveBalances(balances) {
  var remains = balances.entrySeq()
    .filter(v => v[1] > 0 || v[1] < 0)
    .groupBy(v => v[1] > 0)
  var positives = remains.get(true).sort((a, b) => a[1] - b[1]).toArray()
  var negatives = remains.get(false).sort((a, b) => b[1] - a[1]).toArray()
  var transactions = []
  while (positives.length > 0) {
    invariant(negatives.length > 0, 'balances do no sum up to zero')
    var ps = positives[0]
    var ng = negatives[0]
    if (ps[1] >= -ng[1]) {
      transactions.push({ from: ng[0], to: ps[0], value: -ng[1] })
      negatives.shift()
      ps[1] += ng[1]
      if (ps[1] <= 0.01) {
        positives.shift()
      }
    } else {
      transactions.push({ from: ng[0], to: ps[0], value: ps[1] })
      positives.shift()
      ng[1] += ps[1]
      if (ng[1] >= -0.01) {
        negatives.shift()
      }
    }
  }
  invariant(negatives.length === 0, 'balances do no sum up to zero')
  return new Immutable.Set(transactions)
}

module.exports = solveBalances
