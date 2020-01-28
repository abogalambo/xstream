import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faExpandAlt,
  faCompressAlt
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
  setImageStyle as setImageStyleAction
} from '../../../state/actions/image'
import ImageInput from '../../lib/image_input'
import ImageDisplay from '../../lib/image_display'
import styles from './segment_image.css'

const SegmentImage = () => {
  const imageUploadKey = useSelector(segmentImageUploadKeySelector)
  const { image } = useSelector(currentSegmentDataSelector)
  const isPlaybackMode = useSelector(isPlaybackModeSelector)
  const isCoverImageStyle = image && (image.style == 'COVER')

  const dispatch = useDispatch();
  const addImage = (e) => dispatch(addImageAction(e, imageUploadKey))
  const removeImage = () => dispatch(removeImageAction())
  const setImageCaption = (caption) => dispatch(setImageCaptionAction(caption))

  const setImageStyle = () => {
    const newStyle = isCoverImageStyle ? 'FIT' : 'COVER'
    dispatch(setImageStyleAction(newStyle))
  }

  const [ isHovered, setIsHovered ] = useState(false);
  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
      image ? (
        <div
          style={isCoverImageStyle ? {width: "100%"} : {}}
          className={classnames(styles.imageWrapper, { [styles.imageWrapper_border]: !isPlaybackMode})}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ImageDisplay
            {...image}
            editable={!isPlaybackMode}
            onEdit={setImageCaption}
          />
          { !isPlaybackMode && isHovered && (
            <div
              className={styles.imageControls}
            >
              <button>
                <FontAwesomeIcon
                  onClick={removeImage}
                  icon={faTimes}
                />
              </button>

              <button>
                <FontAwesomeIcon
                  onClick={setImageStyle}
                  icon={isCoverImageStyle ? faCompressAlt : faExpandAlt}
                />
              </button>
            </div>
          )}
        </div>
      ) : (
        <ImageInput
        onChange={addImage}
        text='Add Image'
        className={'standard'} />
      )
  )
}

export default SegmentImage
