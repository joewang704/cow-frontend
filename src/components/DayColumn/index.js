import { connect } from 'react-redux'
import { createItemPlaceholder } from '../../ducks/ui.js'
import { editItem } from '../../ducks/items.js'
import DayColumn from './DayColumn'
import moment from 'moment'

const mapStateToProps = ({ items, ui }, ownProps) => {
  let renderItems = []
  if (items && items.size > 0) {
    const itemObj = items.toJS()
    renderItems = Object.keys(itemObj).filter((id) =>
      ownProps.dayMoment.isSame(moment(itemObj[id].date), 'day')
    ).map((id) => itemObj[id])
  }
  let uiObj = ui.toJS()
  return {
    items: renderItems,
    itemPlaceholder: uiObj.itemPlaceholder && uiObj.itemPlaceholder.date.isSame(ownProps.dayMoment) ? ui.toJS().itemPlaceholder.date : null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createItemPlaceholder: (date) => dispatch(createItemPlaceholder(date)),
    changeItemDate: (id, date) => dispatch(editItem(id, null, date)),
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(DayColumn)

export default Container

