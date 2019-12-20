import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  mediaKeysSelector
} from '../../../state/selectors/current_stream'
import MediaManager from '../../../lib/media_manager'

const MediaCleaner = () => {
  const mediaKeys = useSelector(mediaKeysSelector)
  const [previousMediaKeys, setPreviousMediaKeys] = useState([])
  const mediaManager = new MediaManager()

  useEffect(() => {
    const mediaKeysSet = new Set(mediaKeys)
    const deletedMediaKeys = previousMediaKeys.filter(mediaKey => !mediaKeysSet.has(mediaKey))
    deletedMediaKeys.forEach(deletedMediaKey => {
      mediaManager.delete(deletedMediaKey)
    })
    setPreviousMediaKeys(mediaKeys)
  }, [mediaKeys]);

  return null
}

export default MediaCleaner
