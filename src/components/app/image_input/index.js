import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faMinusCircle
} from '@fortawesome/free-solid-svg-icons'
import {
  addImage as addImageAction,
  removeImage as removeImageAction,
  setImageCaption as setImageCaptionAction
} from '../../../state/actions/image'
import ImageDisplay from '../../lib/image_display'
import styles from './image_input.css'

const ImageInput = ({src, caption}) => {
  const dispatch = useDispatch();
  const addImage = (e) => { dispatch(addImageAction(e)) }
  const removeImage = () => { dispatch(removeImageAction()) }
  const setImageCaption = (caption) => { dispatch(setImageCaptionAction(caption)) }

  if(src) {
    return (
      <div className={styles.imageContainer}>
        <ImageDisplay
          src={src}
          caption={caption}
          editable={true}
          onEdit={setImageCaption}
        />
        <FontAwesomeIcon
          className={styles.removeButton}
          onClick={removeImage}
          icon={faMinusCircle}
          size="sm"
        />
      </div>
    )
  }else{
    const randomId = new Date().getTime()
    return (
      <div className={styles.imageInput}>
        <label htmlFor={randomId}>
          <FontAwesomeIcon size="5x" icon={faImage} />
        </label>
        <input
          accept="image/*"
          id={randomId}
          type="file"
          value=""
          onChange={addImage} />
      </div>
    )
  }
}

ImageInput.propTypes = {
  src: PropTypes.string,
  caption: PropTypes.string
}

export default ImageInput
