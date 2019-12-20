import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  mediaKeysSelector
} from '../../../state/selectors/current_stream'

const MediaCleaner = () => {
  const mediaKeys = useSelector(mediaKeysSelector)
  const [previousMediaKeys, setPreviousMediaKeys] = useState([])

  useEffect(() => {
    const mediaKeysSet = new Set(mediaKeys)
    const deletedMediaKeys = previousMediaKeys.filter(mediaKey => !mediaKeysSet.has(mediaKey))
    deletedMediaKeys.forEach(deletedMediaKey => {
      console.log(deletedMediaKey)
    })
    setPreviousMediaKeys(mediaKeys)
  }, [mediaKeys]);

  return null
}

export default MediaCleaner
