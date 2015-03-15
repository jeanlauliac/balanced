'use strict'

import Frame from './Frame'
import React from 'react'
import Tab from './Tab'
import invariant from '../../invariant'
import mergeClasses from '../../utils/mergeClasses'

var Styles = stylify({
  '.header': {
    color: '#AAA9AB',
    fontSize: '0.875em',
    textTransform: 'uppercase',
    'a': {
      color: 'inherit',
      textDecoration: 'none',
    }
  },
  'ul.titles': {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    'li': {
      display: 'inline-block',
      '&.open': {
        color: '#575458',
        padding: '1rem .2rem .5rem 1rem'
      },
    },
    'a': {
      padding: '1rem .2rem .5rem 1rem',
    },
  },
  '.action': {
    float: 'right',
    padding: '1rem 1rem .5rem .2rem',
    'span': {
      backgroundColor: '#474646',
      color: '#fff',
      margin: '-.1rem -.4rem',
      padding: '.1rem .4rem',
    }
  },
})

/**
 * Displays content on top of which is added a tab system. Clicking on a tab
 * title transition the view to another content. Clicking on the back button
 * unwinds the frame stack.
 */
var Navigator = React.createClass({
  render() {
    var lastFrame
    React.Children.forEach(this.props.children, (frame) => {
      if (frame != undefined) {
        invariant(frame.type === Frame.type, 'child isn\'t a Frame')
        lastFrame = frame
      }
    })
    if (lastFrame == undefined) {
      return null
    }
    return this._renderFrame(lastFrame)
  },

  _renderContent(frame) {
    var singleChild
    React.Children.forEach(frame.props.children, (tab) => {
      if (tab.props.isOpen) {
        invariant(singleChild == undefined, 'two Tabs cannot be open at once')
        singleChild = tab
      }
    })
    return (
      <div>
        {singleChild.props.children}
      </div>
    )
  },

  _renderFrame(frame) {
    var tabTitles =
      React.Children.map(frame.props.children, this._renderTabTitle)
    return (
      <div className={this.props.className}>
        <div className={Styles.header}>
          {this._renderAction(frame)}
          <ul className={Styles.titles}>
            {this._renderBack(frame)}
            {tabTitles}
          </ul>
        </div>
        {this._renderContent(frame)}
      </div>
    )
  },

  _renderAction(frame) {
    if (frame.props.actionLabel == undefined) {
      return
    }
    return (
      <a
        className={Styles.action}
        href='#'
        onClick={() => frame.props.onAction()}>
        <span>{frame.props.actionLabel}</span>
      </a>
    )
  },

  _renderTabTitle(tab) {
    if (tab == undefined) {
      return
    }
    invariant(tab.type === Tab.type, 'child isn\'t a Tab')
    invariant(
      tab.props.isOpen || tab.pops.onClick != undefined,
      'non-open Tab must provide `onClick` callback'
    )
    if (tab.props.isOpen) {
      return (
        <li
          className={Styles.open}
          key={tab.props.key}>
          {tab.props.title}
        </li>
      )
    }
    return (
      <li key={tab.props.key} className={Styles.TAB_TITLE}>
        <a href='#' onClick={tab.props.onClick.bind(undefined)}>
          {tab.props.title}
        </a>
      </li>
    )
  },

  _renderBack(frame) {
    if (frame.props.onBackClick != undefined) {
      return (
        <li>
          <a href='#' onClick={() => frame.props.onBackClick()}>{'<<'}</a>
        </li>
      )
    }
  },
})

module.exports = Navigator
