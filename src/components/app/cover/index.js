import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faPlay
} from '@fortawesome/free-solid-svg-icons'
import {
  addSegment,
  goToSegment,
} from '../../../state/actions/stream'
import { setStreamTitle } from '../../../state/actions/stream'
import {
  segmentsSelector,
  coverDataSelector,
  isPlaybackModeSelector
} from '../../../state/selectors/current_stream'
import TextInput from '../../lib/text_input'
import styles from './cover.css'

const Cover = () => {
  const { title } = useSelector(coverDataSelector)
  const hasSegments = useSelector(segmentsSelector).length
  const isPlaybackMode = useSelector(isPlaybackModeSelector)

  const dispatch = useDispatch()
  const onTitleChange = (event) => dispatch(setStreamTitle(event.target.value))

  const icon = (hasSegments || isPlaybackMode) ? faPlay : faPlus
  const action = (hasSegments || isPlaybackMode) ? goToSegment(0) : addSegment()
  const onClick = () => dispatch(action)

  return (
    <div className={styles.cover}>
      <TextInput
        readOnly={isPlaybackMode}
        value={title}
        onChange={onTitleChange}
        maxChars={40}
        prompt="Add Title .."
      />

      <button onClick={onClick}>
        <FontAwesomeIcon
          size={'3x'}
          icon={icon}
        />
      </button>
    </div>
  )
}

export default Cover
