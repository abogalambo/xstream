import { connect } from 'react-redux'
import { increment, decrement } from '../../state/count/actions'
import CounterComponent from './counter_component'

const mapStateToProps = state => ({
  count: state.count
})

const mapDispatchToProps = dispatch => ({
  onIncrementClick: () => dispatch(increment()),
  onDecrementClick: () => dispatch(decrement()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterComponent)
