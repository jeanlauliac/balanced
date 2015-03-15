'use strict'

import Frame from './Frame'
import React from 'react'
import Tab from './Tab'
import invariant from '../../invariant'
import mergeClasses from '../../utils/mergeClasses'

var Styles = stylify({
  'ul.titles': {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    '& li': {
      color: '#AAA9AB',
      fontSize: '0.875em',
      textTransform: 'uppercase',
      '&.open': {
        color: '#575458',
      }
    }
  }
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
      <div>
        <ul className={Styles.titles}>
          {this._renderBack(frame)}
          {tabTitles}
        </ul>
        {this._renderAction(frame)}
        {this._renderContent(frame)}
      </div>
    )
  },

  _renderAction(frame) {
    if (frame.props.actionLabel == undefined) {
      return
    }
    return (
      <a href='#' onClick={() => frame.props.onAction()}>
        {frame.props.actionLabel}
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
        <li key='back'>
          <a href='#' onClick={() => frame.props.onBackClick()}>{'<<'}</a>
        </li>
      )
    }
  },
})

module.exports = Navigator
