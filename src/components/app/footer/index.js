import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  addSegment,
  removeSegment,
  goToSegment,
} from '../../../state/actions/stream'
import Recorder from '../recorder'
import styles from './footer.css'

const Footer = () => {
  const currentStream = useSelector(state => state.currentStream);
  const { segments, currentSegment } = currentStream
  const { index } = currentSegment

  const dispatch = useDispatch();
  const onAddSegmentClick = () => dispatch(addSegment())
  const onRemoveSegmentClick = () => dispatch(removeSegment())
  const onNextSegmentClick = () => dispatch(goToSegment(index + 1))
  const onPreviousSegmentClick = () => dispatch(goToSegment(index - 1))

  const segment = segments[index]

  return (
    <div className={styles.footer}>
      <span> Current Index: { currentSegment.index } </span>
      <button onClick={onAddSegmentClick}> + </button>
      <button onClick={onRemoveSegmentClick}> - </button>
      <button onClick={onPreviousSegmentClick}> {"<"} </button>
      <button onClick={onNextSegmentClick}> {">"} </button>
      { segment && (
        <Recorder key={`recorder_${segment.timestamp}`} />
      )}
    </div>
  )
}

export default Footer
