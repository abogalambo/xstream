import { connect } from 'react-redux'
import {
  setSegmentText
} from '../../state/actions/segment'
import SegmentComponent from './segment_component'

const mapDispatchToProps = (dispatch, ownProps) => (
  ownProps.current ? {
    onTextChange: (event) => dispatch(setSegmentText(event.target.value))
  } : {}
)

export default connect(
  null,
  mapDispatchToProps
)(SegmentComponent)
