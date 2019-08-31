import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { setSegmentText } from '../../../state/actions/segment'
import {
  removeImage as removeImageAction,
  setImageCaption as setImageCaptionAction
} from '../../../state/actions/image'
import TextInput from '../../lib/text_input'
import ImageInput from '../image_input'
import ImageDisplay from '../../lib/image_display'
import styles from './segment.css'

const Segment = ({
  text,
  image,
  isPlaybackMode
}) => {
  const dispatch = useDispatch();
  const onTextChange = (event) => dispatch(setSegmentText(event.target.value))
  const removeImage = () => dispatch(removeImageAction())
  const setImageCaption = (caption) => dispatch(setImageCaptionAction(caption))

  const textCollapsed = (isPlaybackMode && !text) || image
  const imageCollapsed = (isPlaybackMode && !image) || text

  return (
    <div className={styles.segment}>
      <div className={classnames(
        styles.mediaInput,
        {
          [styles.collapsed]: textCollapsed
        }
      )}>
        { !textCollapsed && (
          <TextInput
            value={text || ''}
            onChange={onTextChange}
            maxChars={200}
            prompt="Write Something .."
            readOnly={isPlaybackMode}
          />
        )}
      </div>
      <div className={classnames(
        styles.mediaInput,
        {
          [styles.collapsed]: imageCollapsed
        }
      )}>
        { !imageCollapsed && (
          isPlaybackMode || image ? (
            <div className={styles.imageContainer}>
              <ImageDisplay
                {...image}
                editable={!isPlaybackMode}
                onEdit={setImageCaption}
              />
             { !isPlaybackMode && (
               <FontAwesomeIcon
                className={styles.removeButton}
                onClick={removeImage}
                icon={faTimes}
                size="lg"
              />
            )}
            </div>
          ) : (
            <ImageInput {...image} />
          )
        )}
      </div>
    </div>
  )
}

Segment.propTypes = {
  text: PropTypes.string,
  image: PropTypes.object,
  isPlaybackMode: PropTypes.bool
}

export default Segment
