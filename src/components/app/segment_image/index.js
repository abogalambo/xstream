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
  setImageStyle as setImageStyleAction
} from '../../../state/actions/image'
import ImageInput from '../../lib/image_input'
import ImageDisplay from '../../lib/image_display'
import ToggleButton from '../../lib/toggle_button'
import styles from './segment_image.css'

const SegmentImage = () => {
  const imageUploadKey = useSelector(segmentImageUploadKeySelector)
  const { image } = useSelector(currentSegmentDataSelector)
  const isPlaybackMode = useSelector(isPlaybackModeSelector)

  const dispatch = useDispatch();
  const addImage = (e) => dispatch(addImageAction(e, imageUploadKey))
  const removeImage = () => dispatch(removeImageAction())
  const setImageCaption = (caption) => dispatch(setImageCaptionAction(caption))

  const setImageStyle = (e) => {
    dispatch(setImageStyleAction(e.target.value))
  }

  const styleToggleContent = [
    {
      value: 'FIT',
      text:'Fit'
    },
    {
      value: 'COVER',
      text:'Cover'
    }
  ]

  return (
      image ? (
        <div
          style={image.style == 'COVER' ? {width: "100%"} : {}}
          className={classnames(styles.imageWrapper, { [styles.imageWrapper_border]: !isPlaybackMode})}
        >
          <ImageDisplay
            {...image}
            editable={!isPlaybackMode}
            onEdit={setImageCaption}
          />
          { !isPlaybackMode && (
            <div className={styles.imageControls}>
              <button className={styles.removeButton}>
                <FontAwesomeIcon
                  className={styles.removeButton_icon}
                  onClick={removeImage}
                  icon={faTimes}
                  size="1x"
                />
              </button>

              <ToggleButton
                contents={styleToggleContent}
                onToggle={setImageStyle}
                checkedValue={image.style || 'FIT'}
              />
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
