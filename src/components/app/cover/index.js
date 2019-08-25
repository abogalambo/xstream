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
import TextInput from '../../lib/text_input'
import styles from './cover.css'

const Cover = () => {
  const currentStream = useSelector(state => state.currentStream);
  const { title, segments, mode } = currentStream
  const dispatch = useDispatch()

  const onTitleChange = (event) => dispatch(setStreamTitle(event.target.value))
  const hasSegments = segments.length > 0
  const playbackMode = mode == "playback"
  const icon = (hasSegments || playbackMode) ? faPlay : faPlus
  const action = (hasSegments || playbackMode) ? goToSegment(0) : addSegment()
  const onClick = () => dispatch(action)

  const textInputProps = Object.assign(
    {
      value: title
    }, playbackMode ? (
      {
        disabled: true
      }
    ) : (
      {
        onChange: onTitleChange,
        maxChars: 40,
        prompt: "Add Title .."
      }
    )
  )

  return (
    <div className={styles.cover}>
      <TextInput {...textInputProps} />

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
