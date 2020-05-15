import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import {
  indexSelector,
  isPlaybackModeSelector,
  currentSegmentDataSelector,
  remainingCharCountSelector
} from '../../../state/selectors/current_stream'
import { setSegmentText } from '../../../state/actions/segment'
import {
  startTyping as startTypingAction,
  stopTyping as stopTypingAction,
  removeSegment as removeSegmentAction
} from '../../../state/actions/stream'
import {
  pauseStream
} from '../../../state/actions/playback'
import TextInput from '../../lib/text_input'
import SegmentImage from '../segment_image'
import ClosedCaption from '../closed_caption'
import styles from './segment.css'
import config from '../../../../config'

const Segment = () => {
  const { text, image } = useSelector(currentSegmentDataSelector)
  const isPlaybackMode = useSelector(isPlaybackModeSelector)
  const remainingCharCount = useSelector(remainingCharCountSelector)
  const index = useSelector(indexSelector)

  const dispatch = useDispatch();
  const onTextChange = (newText) => dispatch(setSegmentText(newText))
  const startTyping = () => dispatch(startTypingAction())
  const stopTyping = () => dispatch(stopTypingAction())
  const removeSegment = () => dispatch(removeSegmentAction(index))

  const textDisplayed = !image && (!isPlaybackMode || text)
  const imageDisplayed = !text && (!isPlaybackMode || image)

  const maxChars = Math.min(config.stream.text.maxLength, remainingCharCount)

  const onLinkClick = () => {
    if(isPlaybackMode) {
      dispatch(pauseStream())
    }
  }

  return (
    <div className={classnames(
      styles.segment,
      {
        [styles.segment_compose]: !isPlaybackMode
      }
    )}>
      {!isPlaybackMode && (
        <button
        className={styles.removeSegmentBtn}
        onClick={removeSegment}>
          <FontAwesomeIcon className={styles.removeSegmentBtn_icon}
            icon={faTrash}/>
        </button>
      )}
      <div className={classnames(
        styles.mediaInput,
        {
          [styles.collapsed]: !textDisplayed
        }
      )}>
        { textDisplayed && (
          <TextInput
            value={text || ''}
            minSize={5}
            maxSize={5}
            onChange={onTextChange}
            onFocus={startTyping}
            onBlur={stopTyping}
            onLinkClick={onLinkClick}
            maxChars={maxChars}
            prompt="Write something..."
            readOnly={isPlaybackMode}
          />
        )}
      </div>
      { (textDisplayed && imageDisplayed) && (
        <div className={styles.segment_composeDivider}></div>
      )}
      <div
        className={classnames(
          styles.mediaInput,
          {
            [styles.collapsed]: !imageDisplayed
          }
        )}
      >
        {imageDisplayed && (
          <SegmentImage image={image} />
        )} 
      </div>
      <ClosedCaption />
    </div>
  )
}

export default Segment
