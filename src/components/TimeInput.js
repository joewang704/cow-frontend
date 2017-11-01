import React, { Component } from 'react'

class TimeInput extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      input: '',
    }
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    })
  }

  onSubmit(event) {
    if (event.keyCode == 13) {
      event.target.blur()
      this.context.store.dispatch(editItem(this.props.id, this.state.text))
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.input}
        />
      </div>
    )
  }
}

export default TimeInput
