import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faPlay,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import {
  addSegment,
  goToSegment,
  addCoverImage as addCoverImageAction,
  removeCoverImage as removeCoverImageAction,
  startTyping as startTypingAction,
  stopTyping as stopTypingAction,
} from '../../../state/actions/stream'
import { setStreamTitle } from '../../../state/actions/stream'
import {
  segmentsSelector,
  coverDataSelector,
  isPlaybackModeSelector
} from '../../../state/selectors/current_stream'
import TextInput from '../../lib/text_input'
import ImageInput from '../../lib/image_input'
import styles from './cover.css'

const Cover = () => {
  const { title, cover: coverImage } = useSelector(coverDataSelector)
  const hasSegments = useSelector(segmentsSelector).length
  const isPlaybackMode = useSelector(isPlaybackModeSelector)

  const dispatch = useDispatch()
  const onTitleChange = (event) => dispatch(setStreamTitle(event.target.value))
  const startTyping = () => dispatch(startTypingAction())
  const stopTyping = () => dispatch(stopTypingAction())
  const addCoverImage = (e) => dispatch(addCoverImageAction(e))
  const removeCoverImage = () => dispatch(removeCoverImageAction())

  const icon = (hasSegments || isPlaybackMode) ? faPlay : faPlus
  const action = (hasSegments || isPlaybackMode) ? goToSegment(0) : addSegment()
  const onClick = () => dispatch(action)

  const hasCoverImage = coverImage && coverImage.src
  const coverStyle = hasCoverImage ? {
    backgroundImage: `url(${coverImage.src})`
  } : {}

  return (
    <div
      className={styles.cover}
      style={coverStyle}
    >
      <div className={styles.titleConainer}>
        <TextInput
          readOnly={isPlaybackMode}
          value={title}
          onChange={onTitleChange}
          onFocus={startTyping}
          onBlur={stopTyping}
          maxChars={40}
          prompt="Add Title .."
        />
      </div>

      <button 
        onClick={onClick}
        className={styles.playButton}
      >
        <FontAwesomeIcon
          size={'3x'}
          icon={icon}
        />
      </button>

      {!isPlaybackMode && (
        <div className={styles.addRemoveImage}>
          {hasCoverImage ? (
            <button
              className={styles.removeImage}
              onClick={removeCoverImage}
            >
              <FontAwesomeIcon
                size={'2x'}
                icon={faTimes}
              />
            </button>
          ) : (
            <ImageInput
              onChange={addCoverImage}
              buttonDisplay
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Cover
