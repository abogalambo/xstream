import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStreamList } from '../../../state/actions/stream_list'
import StreamList from '../stream_list'
import Spinner from '../../lib/spinner'

const StreamListLoader = () => {
  const currentStreamList = useSelector(state => state.currentStreamList)
  const dispatch = useDispatch()

  useEffect(() => {
    if(currentStreamList == null){
      dispatch(fetchStreamList())
    }
  }, [])

  return currentStreamList ? (
    <StreamList />
  ) : (
    <Spinner />
  )
}

export default StreamListLoader
