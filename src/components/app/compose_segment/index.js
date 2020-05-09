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
import TextInput from '../../lib/text_input'
import styles from './compose_segment.css'

const ComposeSegment = ({index}) => {
  const currentIndex = useSelector(indexSelector)
  const segments = useSelector(segmentsSelector)
  const segment = segments[index] || {}
  const nextSegment = segments[index + 1] || {}

  const { text } = segment

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

  return (
    <div className={classnames(
        styles.composeSegment,
        {
          [styles.selectedSegment]: index == currentIndex
        }
      )}
      onClick={goToSegment}
    >
      
      <button
        className={styles.removeSegmentBtn}
        onClick={removeSegment}
      >
        <FontAwesomeIcon className={styles.removeSegmentBtn_icon} icon={faTrash} />
      </button>

      {canAppendSegment && (
        <button
          className={styles.addSegmentBtn}
          onClick={addSegment}
        >
          <FontAwesomeIcon className={styles.addSegmentBtn_icon} icon={faPlus} />
        </button>
      )}

      <div className={styles.nonVisual}>
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

const isEmpty = (segment) => {
  const { text, image, audio } = segment
  return !text && !image && !audio
}

ComposeSegment.propTypes = {
  index: PropTypes.number.isRequired
}

export default ComposeSegment
