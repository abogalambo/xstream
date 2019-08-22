import React from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage
} from '@fortawesome/free-solid-svg-icons'
import {
  addImage as addImageAction,
  removeImage as removeImageAction
} from '../../../state/actions/image'
import ImageDisplay from '../../lib/image_display'
import styles from './image_input.css'

const ImageInput = ({src, caption}) => {
  const dispatch = useDispatch();
  const addImage = (e) => { dispatch(addImageAction(e)) }
  const removeImage = () => { dispatch(removeImageAction()) }

  if(src) {
    return (
      <ImageDisplay src={src} />
    )
  }else{
    const randomId = new Date().getTime()
    return (
      <div className={styles.imageInput}>
        <label htmlFor={randomId}>
          <FontAwesomeIcon size="5x" icon={faImage} />
        </label>
        <input id={randomId} type="file" value="" onChange={addImage} />
      </div>
    )
  }
}

export default ImageInput
