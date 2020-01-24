import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import {
  segmentImageUploadKeySelector,
  currentSegmentDataSelector,
  isPlaybackModeSelector
} from '../../../state/selectors/current_stream'
import {
  addImage as addImageAction,
  removeImage as removeImageAction,
  setImageCaption as setImageCaptionAction,
  setImageStyle as setImageStyle
} from '../../../state/actions/image'
import ImageInput from '../../lib/image_input'
import ImageDisplay from '../../lib/image_display'
import styles from './segment_image.css'

const SegmentImage = () => {
  const imageUploadKey = useSelector(segmentImageUploadKeySelector)
  const { image } = useSelector(currentSegmentDataSelector)
  const isPlaybackMode = useSelector(isPlaybackModeSelector)

  const dispatch = useDispatch();
  const addImage = (e) => dispatch(addImageAction(e, imageUploadKey))
  const removeImage = () => dispatch(removeImageAction())
  const setImageCaption = (caption) => dispatch(setImageCaptionAction(caption))

  return (
    <div 
      style={{backgroundColor: 'red'}}
      className={styles.segmentImage}
    >
      { isPlaybackMode || image ? (
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
        ) : (
          <ImageInput
          onChange={addImage}
          text='Add Image'
          className={'standard'} />
        )
      }
    </div>
  )
}

export default SegmentImage
