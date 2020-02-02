import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStreamList } from '../../../state/actions/stream_list'

const StreamListLoader = () => {
  const currentStreamList = useSelector(state => state.currentStreamList)
  const dispatch = useDispatch()

  useEffect(() => {
    if(currentStreamList == null){
      dispatch(fetchStreamList())
    }
  }, [])

  return currentStreamList ? (
    <div> Stream List loaded </div>
  ) : (
    <div> Loading Stream List </div>
  )
}

export default StreamListLoader
