import { connect } from 'react-redux'
import { newStream } from '../../state/actions/stream'
import MainScreenComponent from './main_screen_component'

const mapStateToProps = state => ({
  currentStream: state.currentStream
})

const mapDispatchToProps = dispatch => ({
  onNewStreamClick: () => dispatch(newStream())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreenComponent)
