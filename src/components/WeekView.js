import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { weekFromStartDate } from '../utils/calendar.js'
import { nextWeek, prevWeek } from '../ducks/calendar.js'
import DayColumn from './DayColumn'
import moment from 'moment'

const mapStateToProps = ({ calendar }) => ({
  startDateMoment: moment(calendar.get('activeWeekStartDate'))
})

const mapDispatchToProps = dispatch => ({
  nextWeek: () => dispatch(nextWeek()),
  prevWeek: () => dispatch(prevWeek())
})

class WeekView extends Component {
  constructor(props) {
    super(props)
    this.handleArrowKeys = this.handleArrowKeys.bind(this)
  }

  handleArrowKeys() {
    if (event.key === "ArrowLeft") {
      this.props.prevWeek()
    } else if (event.key === "ArrowRight") {
      this.props.nextWeek()
    }
  }

	componentWillMount() {
    if (typeof document !== 'undefined') {
      document.addEventListener("keydown", this.handleArrowKeys)
    }
  }

  componentWillUnmount() {
    if (typeof document !== 'undefined') {
      document.removeEventListener("keydown", this.handleArrowKeys)
    }
  }

  render() {
    const { startDateMoment, nextWeek, prevWeek } = this.props
    console.log(moment(startDateMoment)._d)
    return (
      <div style={{
        width: '92%',
        height: '96%',
        margin: '4% 4% 0% 4%',
      }}>
        <i onClick={prevWeek} style={leftArrowStyle} className="fa fa-arrow-left" aria-hidden="true"></i>
        <i onClick={nextWeek} style={rightArrowStyle} className="fa fa-arrow-right" aria-hidden="true"></i>
        <div style={{
          width: '92%',
          height: '8%',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
        }}>
          <div style={{ color: '#555' }}>
            { `${startDateMoment.format('MMMM')} ${startDateMoment.format('YYYY')}` }
          </div>
        </div>
        <div style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          boxShadow: '0 0px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        }}>
          {
            weekFromStartDate(startDateMoment).map(
              day => <DayColumn dayMoment={day} key={day} />)
          }
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDropContext(HTML5Backend)(WeekView))

const leftArrowStyle = {
  color: '#FF8A80',
  fontSize: '30px',
  position: 'absolute',
  top: '50%',
  left: '1%',
}
const rightArrowStyle = {
  color: '#FF8A80',
  fontSize: '30px',
  position: 'absolute',
  top: '50%',
  right: '1%',
}
const monthStyle = {
  padding: '3px',
  margin: '10px',
  //color: '#44344F',
  color: 'white',
  textTransform: 'uppercase',
  fontWeight: 'bold',
}
