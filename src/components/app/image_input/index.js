import React from 'react'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage
} from '@fortawesome/free-solid-svg-icons'
import {
  addImage as addImageAction,
  removeImage as removeImageAction
} from '../../../state/actions/image'
import styles from './image_input.css'

const ImageInput = ({src, caption}) => {
  const dispatch = useDispatch();
  const addImage = (e) => { dispatch(addImageAction(e)) }
  const removeImage = () => { dispatch(removeImageAction()) }

  if(src) {
    return (
      <div className={styles.limitHeight}>
        <img className={classnames(styles.image)} src={src} />
      </div>
    )
  }else{
    const randomId = new Date().getTime()
    return (
      <div className={styles.imageInput}>
        <label for={randomId}>
          <FontAwesomeIcon size="5x" icon={faImage} />
        </label>
        <input id={randomId} type="file" value="" onChange={addImage} />
      </div>
    )
  }
}

export default ImageInput
