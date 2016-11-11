import React, { Component, PropTypes } from 'react'
import { createItem } from '../ducks/items.js'
import { deleteItemPlaceholder } from '../ducks/ui.js'
import TextArea from 'react-textarea-autosize'

class ItemPlaceholder extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.onEnter = this.onEnter.bind(this)
    this.submit = this.submit.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.state = {
      text: '',
    }
  }

  handleChange(event) {
    let input = event.target.value
    const prev = this.state.text
    if (input.length > prev.length
        && input.indexOf('@') > -1
        && prev.indexOf('@') == -1) {
        this.setState({
          text: prev + '@{}{}'
        })
    } else {
      this.setState({
        text: input
      })
    }
  }

  onEnter(event) {
    if (event.keyCode == 13) {
      event.target.blur()
      this.submit()
    }
  }

  submit() {
    this.context.store.dispatch(
      createItem(this.state.text, this.props.dayMoment)
    )
  }

  onDelete(event) {
    event.stopPropagation()
    this.context.store.dispatch(deleteItemPlaceholder())
  }

  render() {
    const closeIcon =
      <i
        style={closeIconStyle}
        className="fa fa-times"
        onClick={this.onDelete}
      ></i>

    return (
      <div style={{
        position: 'relative',
        textAlign: 'center',
        width: '90%',
        padding: '6px 6px 10px',
        backgroundColor: '#FF8A80',
        boxShadow: '0 2px 4px rgba(0,0,0,0.16), 0 2px 4px rgba(0,0,0,0.23)',
        marginTop: '7%',
        cursor: 'default',
        color: '#ededed',
        borderRadius: '2px',
      }}>
        <TextArea
          style={{
            background: 'transparent',
            outline: 'none',
            resize: 'none',
            borderStyle: 'none',
            width: '100%',
          }}
          value={this.state.text}
          onClick={(event) => event.stopPropagation()}
          onChange={this.handleChange}
          onKeyDown={this.onEnter}
          autoFocus
        />
        { closeIcon }
      </div>
    )
  }
}

ItemPlaceholder.contextTypes = {
  store: PropTypes.object,
}

export default ItemPlaceholder

const closeIconStyle = {
  position: 'absolute',
  right: '3px',
  top: '3px',
  zIndex: 10,
  color: '#eee',
}


