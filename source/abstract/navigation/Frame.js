'use strict'

import React from 'react'
import invariant from '../../invariant'

/**
 * Represents a single frame inside a Navigator.
 */
var Frame = React.createClass({
  propTypes: {
    /**
     * Label that should appear in the optional 'action button' in the top
     * right corner.
     */
    actionLabel: React.PropTypes.string,
    /**
     * Called when the action button is clicked.
     */
    onAction: React.PropTypes.func,
    /**
     * Called when the 'back' navigation button was cliked. This should
     * typically pop the last children frame.
     */
    onBackClick: React.PropTypes.func.isRequired,
    /**
     * The key of the tab currently displayed to the user.
     */
    openTab: React.PropTypes.string.isRequired,
  },

  render() {
    invariant(false, 'Frame cannot be rendered standalone')
  },
})

module.exports = Frame
