import { connect } from 'react-redux'
import {
  setStreamTitle,
  addSegment,
  removeSegment,
  nextSegment,
  previousSegment
} from '../../state/actions/stream'
import StreamComponent from './stream_component'

const mapStateToProps = state => {
  const { currentStream } = state

  return currentStream
}

const mapDispatchToProps = dispatch => ({
  onTitleChange: (event) => dispatch(setStreamTitle(event.target.value)),
  onAddSegmentClick: () => dispatch(addSegment()),
  onRemoveSegmentClick: () => dispatch(removeSegment()),
  onNextSegmentClick: () => dispatch(nextSegment()),
  onPreviousSegmentClick: () => dispatch(previousSegment()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamComponent)
