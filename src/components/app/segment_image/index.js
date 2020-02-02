import React from 'react'
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
  isPlaybackModeSelector,
  canAddImageSelector
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
  const canAddImage = useSelector(canAddImageSelector)
  const isCoverImageStyle = image && (image.style == 'COVER')

  const dispatch = useDispatch();
  const addImage = (e) => dispatch(addImageAction(e, imageUploadKey))
  const removeImage = () => dispatch(removeImageAction())
  const setImageCaption = (caption) => dispatch(setImageCaptionAction(caption))

  const setImageStyle = () => {
    const newStyle = isCoverImageStyle ? 'FIT' : 'COVER'
    dispatch(setImageStyleAction(newStyle))
  }

  return (
      image ? (
        <div
          style={isCoverImageStyle ? {width: "100%"} : {}}
          className={classnames(styles.imageWrapper, { [styles.imageWrapper_border]: !isPlaybackMode})}
        >
          <ImageDisplay
            {...image}
            editable={!isPlaybackMode}
            onEdit={setImageCaption}
          />
          { !isPlaybackMode && (
            <div className={styles.imageControls}>
              <button>
                <FontAwesomeIcon
                  onClick={removeImage}
                  icon={faTimes}
                  size="2x"
                />
              </button>

              <button>
                <FontAwesomeIcon
                  onClick={setImageStyle}
                  icon={isCoverImageStyle ? faCompressAlt : faExpandAlt}
                  size="2x"
                />
              </button>
            </div>
          )}
        </div>
      ) : (
        <ImageInput
          onChange={addImage}
          text='Add Image'
          disabled={!canAddImage}
          className={'standard'}
        />
      )
  )
}

export default SegmentImage
