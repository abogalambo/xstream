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
  addCoverImage as addCoverImageAction,
  removeCoverImage as removeCoverImageAction,
  startTyping as startTypingAction,
  stopTyping as stopTypingAction
} from '../../../state/actions/stream'
import {
  playStream
} from '../../../state/actions/playback'
import { setStreamTitle } from '../../../state/actions/stream'
import {
  segmentsSelector,
  coverDataSelector,
  isPlaybackModeSelector,
  coverImageUploadKeySelector
} from '../../../state/selectors/current_stream'
import TextInput from '../../lib/text_input'
import ImageInput from '../../lib/image_input'
import classnames from 'classnames';
import styles from './cover.css'
import config from '../../../../config'

const Cover = () => {
  const { title, cover: coverImage } = useSelector(coverDataSelector)
  const hasSegments = useSelector(segmentsSelector).length
  const isPlaybackMode = useSelector(isPlaybackModeSelector)
  const imageUploadKey = useSelector(coverImageUploadKeySelector)

  const dispatch = useDispatch()
  const onTitleChange = (newTitle) => dispatch(setStreamTitle(newTitle))
  const startTyping = () => dispatch(startTypingAction())
  const stopTyping = () => dispatch(stopTypingAction())
  const addCoverImage = (e) => dispatch(addCoverImageAction(e, imageUploadKey))
  const removeCoverImage = () => dispatch(removeCoverImageAction())

  const icon = (hasSegments || isPlaybackMode) ? faPlay : faPlus
  const action = (hasSegments || isPlaybackMode) ? playStream() : addSegment(0)
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
          maxSize={15}
          minSize={5}
          onChange={onTitleChange}
          onFocus={startTyping}
          onBlur={stopTyping}
          maxChars={config.stream.titleMaxLength}
          prompt="Add Title..."
          withStroke
        />
      </div>

      <button
        onClick={onClick}
        className={styles.FAB}
      >
        <FontAwesomeIcon
          className={classnames(
            styles.FAB_icon,
            { [styles.FAB_iconPlay]: icon == faPlay}
          )}
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
                className={styles.removeImage_icon}
                size={'2x'}
                icon={faTimes}
              />
            </button>
          ) : (
            <ImageInput
              onChange={addCoverImage}
              buttonDisplay
              text={'Add cover image'}
              className={'cover'}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Cover
