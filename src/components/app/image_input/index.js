import React from 'react'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
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
    return (
      <input type="file" value="" onChange={addImage} />
    )
  }
}

export default ImageInput
