import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import {
  indexSelector,
  segmentsSelector
} from '../../../state/selectors/current_stream'
import {
  removeSegment as removeSegmentAction,
  goToSegment as goToSegmentAction,
  addSegment as addSegmentAction
} from '../../../state/actions/stream'
import {
  removeRecording as removeRecordingAction
} from '../../../state/actions/recorder'
import {
  isSegmentEmpty as isEmpty
} from '../../../lib/stream'
import AudioInput from '../audio_input'
import TextInput from '../../lib/text_input'
import styles from './compose_segment.css'

const ComposeSegment = ({index}) => {
  const currentIndex = useSelector(indexSelector)
  const segments = useSelector(segmentsSelector)
  const segment = segments[index] || {}
  const nextSegment = segments[index + 1] || {}

  const { text, audio } = segment

  const dispatch = useDispatch();
  const removeSegment = () => dispatch(removeSegmentAction(index))
  const addSegment = (e) => {
    dispatch(addSegmentAction(index + 1))
    e.stopPropagation()
  }
  const goToSegment = () => dispatch(goToSegmentAction(index))

  const isSegmentEmpty = isEmpty(segment)
  const isNextSegmentEmpty = isEmpty(nextSegment)
  const canAppendSegment = !isSegmentEmpty && !isNextSegmentEmpty
  const canDeleteSegment = !isSegmentEmpty || index != segments.length - 1

  const removeRecording = () => {
    dispatch(removeRecordingAction(index))
  }

  return (
    <div className={classnames(
        styles.composeSegment,
        {
          [styles.selectedSegment]: index == currentIndex
        }
      )}
      onClick={goToSegment}
    >
      
      {canDeleteSegment && (
        <button
          className={styles.removeSegmentBtn}
          onClick={removeSegment}
        >
          <FontAwesomeIcon className={styles.removeSegmentBtn_icon} icon={faTrash} />
        </button>
      )}

      {canAppendSegment && (
        <button
          className={styles.addSegmentBtn}
          onClick={addSegment}
        >
          <FontAwesomeIcon className={styles.addSegmentBtn_icon} icon={faPlus} />
        </button>
      )}

      <div className={styles.nonVisual}>
        { !audio && (
          <AudioInput index={index}/>
        )}
        { audio && (
          <>
            <audio
              controls
              src={audio.url}
            />
            <button onClick={removeRecording}>
              Clear
            </button>
          </>
        )}
      </div>

      <div className={styles.visual}>
        {text && (
          <TextInput
            value={text || ''}
            minSize={5}
            maxSize={5}
            readOnly
          />
        )}
      </div>
    </div>
  )
}

ComposeSegment.propTypes = {
  index: PropTypes.number.isRequired
}

export default ComposeSegment
