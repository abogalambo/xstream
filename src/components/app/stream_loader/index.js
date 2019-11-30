import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { newStream, fetchStream } from '../../../state/actions/stream'
import Stream from '../stream'

const StreamLoader = () => {
  const currentStream = useSelector(state => state.currentStream)
  let { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if(currentStream == null){
      if(id){
        dispatch(fetchStream(id))
      } else {
        dispatch(newStream())
      }
    }
  }, [id])

  return currentStream && (
    <Stream />
  )
}

export default StreamLoader
