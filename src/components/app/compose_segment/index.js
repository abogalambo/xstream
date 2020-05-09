import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import {
  indexSelector,
  segmentsSelector
} from '../../../state/selectors/current_stream'
import {
  removeSegment as removeSegmentAction,
  goToSegment as goToSegmentAction
} from '../../../state/actions/stream'
import TextInput from '../../lib/text_input'
import styles from './compose_segment.css'

const ComposeSegment = ({index}) => {
  const currentIndex = useSelector(indexSelector)
  const segments = useSelector(segmentsSelector)

  const { text } = segments[index]

  const dispatch = useDispatch();
  const removeSegment = () => dispatch(removeSegmentAction(index))
  const goToSegment = () => dispatch(goToSegmentAction(index))

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

ComposeSegment.propTypes = {
  index: PropTypes.number.isRequired
}

export default ComposeSegment
