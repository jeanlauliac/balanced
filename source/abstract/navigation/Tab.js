'use strict'

import React from 'react'
import invariant from '../../invariant'

/**
 * Represents a single tab inside a Navigator.
 */
var Tab = React.createClass({
  propTypes: {
    isOpen: React.PropTypes.bool.isRequired,
    /**
     * Called when the user wants to open this tab.
     */
    onClick: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
  },

  render() {
    invariant(false, 'Tab cannot be rendered standalone')
  },
})

module.exports = Tab
