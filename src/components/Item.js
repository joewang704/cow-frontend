import React, { Component, PropTypes } from 'react'
import { deleteItem, editItem, hover } from '../ducks/items.js'
import { openItemSettings } from '../ducks/ui.js'
import { DragSource } from 'react-dnd'
import ContentEditable from './ContentEditable.js'
import moment from 'moment'

const highlightTimes = (text, times) =>
  times.reduce((acc, cur) => acc.replace(cur, `<span class="time-mark">${cur}</span>`), text)

const itemSource = {
  beginDrag: ({ id }) => ({ id })
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

class Item extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.openSettings = this.openSettings.bind(this)
    this.setHovered = this.setHovered.bind(this)
    this.state = {
      text: props.text,
    }
  }

  handleChange(event) {
    this.setState({
      text: event.target.value
    })
  }

  onSubmit(event) {
    if (event.keyCode == 13) {
      event.target.blur()
      this.context.store.dispatch(editItem(this.props.id, this.state.text))
    }
  }

  onDelete(event) {
    event.stopPropagation()
    this.context.store.dispatch(deleteItem(this.props.id, this.props.nextId))
  }

  openSettings(event) {
    event.stopPropagation()
    this.context.store.dispatch(openItemSettings(this.props.id))
  }

  setHovered(hovered) {
    this.context.store.dispatch(hover(this.props.id, hovered))
  }

  render() {
    const { text } = this.state
    const { id, connectDragSource, isDragging, actualDate, parsedTimes, hovered } = this.props

    const closeIcon = hovered ?
      <i
        style={closeIconStyle}
        className="fa fa-times"
        onClick={this.onDelete}
      ></i> : null

    const checkIcon = hovered ?
      <i
        style={checkIconStyle}
        className="fa fa-check"
        onClick={this.onDelete}
      ></i> : null
    const settingsIcon = hovered ?
      <i
        style={settingsIconStyle}
        className="fa fa-cog"
        onClick={this.openSettings}
      ></i> : null

    const overdueText = actualDate ?
      <span
        style={{
          color: '#eee',
          fontSize: '11px',
          //borderBottom: '1px solid #660700',
        }}
      >
        <span style={{
          color: 'red',
          fontWeight: 'bold',
        }}> Overdue </span>
        { moment(actualDate).format('MMM D') }
      </span> : null

    const containerStyle = {
      position: 'relative',
      textAlign: 'center',
      width: '90%',
      padding: hovered ? '6px 6px 25px' : '6px 6px 10px',
      backgroundColor: '#FF8A80',
      boxShadow: '0 2px 4px rgba(0,0,0,0.16), 0 2px 4px rgba(0,0,0,0.23)',
      marginTop: '7%',
      cursor: 'default',
      opacity: isDragging ? 0.5 : 1,
      color: '#ededed',
      borderRadius: '2px',
      transition: 'padding-bottom  .1s ease-in',
    }

    const containerStyle2 = {
      position: 'relative',
      textAlign: 'center',
      width: '90%',
      cursor: 'default',
      opacity: isDragging ? 0.5 : 1,
      color: '#303333',
      borderRadius: '2px',
      marginTop: '7%',
    }

    return connectDragSource(
      <div
        onMouseEnter={() => this.setHovered(true)}
        onMouseLeave={() => this.setHovered(false)}
        style={containerStyle}
      >
        <ContentEditable
          html={highlightTimes(text, parsedTimes)}
          onChange={this.handleChange}
          style={contentStyle}
        />
        { overdueText }
        { closeIcon }
        { checkIcon }
        { settingsIcon }
      </div>
    )
  }
}

Item.contextTypes = {
  store: PropTypes.object,
}

export default DragSource('item', itemSource, collect)(Item)

const checkIconStyle = {
  position: 'absolute',
  bottom: '4px',
  left: '5%',
  zIndex: 10,
  color: '#eee',
  fontSize: '16px',
}

const settingsIconStyle = {
  position: 'absolute',
  bottom: '4px',
  left: '20%',
  zIndex: 10,
  color: '#eee',
  fontSize: '16px',
}

const closeIconStyle = {
  position: 'absolute',
  right: '3px',
  top: '3px',
  zIndex: 10,
  color: '#eee',
  fontSize: '16px',
}

const textBoxStyle = {
  background: 'transparent',
  outline: 'none',
  resize: 'none',
  borderStyle: 'none',
  width: '100%',
}

const contentStyle = {
  minHeight: '24px',
  width: '100%',
  textAlign: 'left',
  padding: '1px 1px 5px 1px',
  zIndex: 1000,
}
