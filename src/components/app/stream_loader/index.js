import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { newStream } from '../../../state/actions/stream'
import Stream from '../stream'

const StreamLoader = () => {
  const currentStream = useSelector(state => state.currentStream);
  const dispatch = useDispatch();

  useEffect(() => {
    if(currentStream == null){
      dispatch(newStream())
    }
  }, [])

  return currentStream && (
    <Stream />
  )
}

export default StreamLoader
