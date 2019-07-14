import { connect } from 'react-redux'
import { increment, decrement } from '../../state/count/actions'
import Counter from './counter_component'

const mapStateToProps = state => ({
  count: state.count
})

const mapDispatchToProps = dispatch => ({
  onIncrementClick: () => dispatch(increment(1)),
  onDecrementClick: () => dispatch(decrement(1)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
