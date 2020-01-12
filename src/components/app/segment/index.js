import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import {
  segmentImageUploadKeySelector
} from '../../../state/selectors/current_stream'
import { setSegmentText } from '../../../state/actions/segment'
import {
  startTyping as startTypingAction,
  stopTyping as stopTypingAction,
  removeSegment as removeSegmentAction
} from '../../../state/actions/stream'
import {
  addImage as addImageAction,
  removeImage as removeImageAction,
  setImageCaption as setImageCaptionAction
} from '../../../state/actions/image'
import TextInput from '../../lib/text_input'
import ImageInput from '../../lib/image_input'
import ImageDisplay from '../../lib/image_display'
import styles from './segment.css'
import config from '../../../../config'

const Segment = ({
  text,
  image,
  isPlaybackMode,
  index
}) => {
  const imageUploadKey = useSelector(segmentImageUploadKeySelector)
  const dispatch = useDispatch();
  const onTextChange = (event) => dispatch(setSegmentText(event.target.value))
  const addImage = (e) => dispatch(addImageAction(e, imageUploadKey))
  const removeImage = () => dispatch(removeImageAction())
  const setImageCaption = (caption) => dispatch(setImageCaptionAction(caption))
  const startTyping = () => dispatch(startTypingAction())
  const stopTyping = () => dispatch(stopTypingAction())
  const removeSegment = () => dispatch(removeSegmentAction(index))

  const textCollapsed = (isPlaybackMode && !text) || image
  const imageCollapsed = (isPlaybackMode && !image) || text

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
          [styles.collapsed]: textCollapsed
        }
      )}>
        { !textCollapsed && (
          <TextInput
            value={text || ''}
            minSize={8}
            maxSize={13}
            onChange={onTextChange}
            onFocus={startTyping}
            onBlur={stopTyping}
            maxChars={config.stream.text.maxLength}
            prompt="Write something..."
            readOnly={isPlaybackMode}
          />
        )}
      </div>
      { (!textCollapsed || !imageCollapsed) && (
        <div className={classnames(
          styles.segment_composeDivider,
          {
            [styles.segment_composeDivider_collapse]: textCollapsed || imageCollapsed
          }
        )}></div>
      )}
      <div className={classnames(
        styles.mediaInput,
        {
          [styles.collapsed]: imageCollapsed
        }
      )}>
        { !imageCollapsed && (
          isPlaybackMode || image ? (
            <div className={styles.imageContainer}>
              <div className={classnames(styles.imageWrapper,
              { [styles.imageWrapper_border]: !isPlaybackMode})}>
                <ImageDisplay
                  {...image}
                  editable={!isPlaybackMode}
                  onEdit={setImageCaption}
                />
               { !isPlaybackMode && (
                  <button className={styles.removeButton}>
                    <FontAwesomeIcon
                      className={styles.removeButton_icon}
                      onClick={removeImage}
                      icon={faTimes}
                      size="1x"
                    />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <ImageInput
            onChange={addImage}
            text='Add Image'
            className={'standard'} />
          )
        )}
      </div>
    </div>
  )
}

Segment.propTypes = {
  text: PropTypes.string,
  image: PropTypes.object,
  isPlaybackMode: PropTypes.bool,
  index: PropTypes.number
}

export default Segment
