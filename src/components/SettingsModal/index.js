import { connect } from 'react-redux'
import { closeItemSettings } from '../../ducks/ui.js'
import SettingsModal from './SettingsModal'

const mapStateToProps = ({ ui, items }) => {
  if (ui.has('itemSettings')) {
    const id = ui.getIn(['itemSettings', 'id'])
    return {
      isOpen: true,
      item: items.get(id),
      id,
    }
  }
  return {
    isOpen: false,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeSettings: () => dispatch(closeItemSettings()),
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsModal)

export default Container


