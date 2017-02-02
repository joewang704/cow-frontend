import React from 'react'
import { DropTarget } from 'react-dnd';
import Item from '../Item'
import ItemPlaceholder from '../ItemPlaceholder'
import { dayMomentToStr, isCurrentDate } from '../../utils/calendar.js'

const columnTarget = {
  drop(props, monitor) {
    props.changeItemDate(monitor.getItem().id, props.dayMoment)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isDragging: !!monitor.getItem(),
})

const DayColumn = ({
  dayMoment, items, itemPlaceholder, createItemPlaceholder, changeItemDate,
  connectDropTarget, isDragging, isOver
}) => {
  const wrapperStyle = {
    height: '100%',
    width: `${100/5}%`,
    borderRight: '1px solid #eee',
  }
  const labelStyle = {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
  }
  const mainStyle = {
    width: '100%',
    height: '80%',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: isDragging ? (isOver ? 1 : 0.5) : 1,
  }
  const dayStyle = {
    fontSize: '14px',
    color: !isCurrentDate(dayMoment) ? '#999' : '#FF8A80',
  }
  const dateStyle = {
    fontSize: '50px',
    color: !isCurrentDate(dayMoment) ? '#aaa' : '#FF5252',
  }

  return connectDropTarget(
    <div style={wrapperStyle}>
      <div style={labelStyle}>
        <span style={dayStyle}>{dayMomentToStr(dayMoment)}</span>
        <div style={dateStyle}>{dayMoment.format('D')}</div>
      </div>
      <div style={mainStyle} onClick={() => createItemPlaceholder(dayMoment)}>
        { items.map(({ id, text }) => <Item key={id} id={id} text={text} />) }
        { itemPlaceholder ? <ItemPlaceholder dayMoment={dayMoment}/> : null }
      </div>
    </div>
  )
}

export default DropTarget('item', columnTarget, collect)(DayColumn)

