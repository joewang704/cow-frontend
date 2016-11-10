import React, { Component, PropTypes } from 'react'
import { deleteItem, editItem } from '../ducks/items.js'
import { DragSource } from 'react-dnd'
import TextArea from 'react-textarea-autosize'

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
    this.setHovered = this.setHovered.bind(this)
    this.state = {
      text: props.text,
      hovered: false,
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
    this.context.store.dispatch(deleteItem(this.props.id))
  }

  setHovered(hovered) {
    this.setState({ hovered: hovered })
  }

  render() {
    const { connectDragSource, isDragging } = this.props
    const closeIcon = this.state.hovered ?
      <i
        style={closeIconStyle}
        className="fa fa-times"
        onClick={this.onDelete}
      ></i> : null

    const containerStyle = {
      position: 'relative',
      textAlign: 'center',
      width: '90%',
      padding: '5px',
      //backgroundColor: '#dce',
      backgroundColor: '#FF8A80',
      boxShadow: '0 2px 4px rgba(0,0,0,0.16), 0 2px 4px rgba(0,0,0,0.23)',
      marginTop: '7%',
      cursor: 'default',
      opacity: isDragging ? 0.5 : 1,
      color: '#ededed',
      borderRadius: '2px',
    }

    return connectDragSource(
      <div
        onMouseEnter={() => this.setHovered(true)}
        onMouseLeave={() => this.setHovered(false)}
        style={containerStyle}
      >
        <TextArea
          style={textBoxStyle}
          value={this.state.text}
          onClick={(event) => event.stopPropagation()}
          onChange={this.handleChange}
          onKeyDown={this.onSubmit}
        />
        { closeIcon }
      </div>
    )
  }
}

Item.contextTypes = {
  store: PropTypes.object,
}

export default DragSource('item', itemSource, collect)(Item)

const closeIconStyle = {
  position: 'absolute',
  right: '3px',
  top: '3px',
  zIndex: 10,
  color: '#eee',
}

const textBoxStyle = {
  background: 'transparent',
  outline: 'none',
  resize: 'none',
  borderStyle: 'none',
  width: '100%',
}

