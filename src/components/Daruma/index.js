import { connect } from 'react-redux'
import Daruma from './Daruma'
import { clearDaruma } from '../../ducks/daruma.js'

const mapStateToProps = (state) => {
  return {
    msg: state.daruma.toJS().msg
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearDaruma() {
    dispatch(clearDaruma())
  }
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Daruma)

export default Container

