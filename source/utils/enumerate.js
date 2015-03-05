function uppercase(value) {
  var retval = ''

  return retval
}

function enumerate(prefix, spec) {
  var retval = {}
  for (var name in spec) {
    retval[name] = prefix + '_' + name
  }
  return retval
}

module.exports = enumerate
