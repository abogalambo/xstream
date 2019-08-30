import React from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons'
import {
  addImage as addImageAction,
} from '../../../state/actions/image'
import styles from './image_input.css'

const ImageInput = () => {
  const dispatch = useDispatch();
  const addImage = (e) => { dispatch(addImageAction(e)) }
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

export default ImageInput
