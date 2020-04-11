import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStreamList } from '../../../state/actions/stream_list'
import {
  streamsSelector,
  streamListFiltersSelector,
  selectedFilterSelector
} from '../../../state/selectors/current_stream_list'
import StreamList from '../stream_list'
import StreamListFilters from '../stream_list_filters'
import Spinner from '../../lib/spinner'

const StreamListLoader = () => {
  const streams = useSelector(streamsSelector)
  const streamListFilters = useSelector(streamListFiltersSelector)
  const selectedFilter = useSelector(selectedFilterSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    if(streams == null){
      dispatch(fetchStreamList(streamListFilters))
    }
  }, [selectedFilter])

  return (
    <>
      <StreamListFilters />
      { streams ? (
        <StreamList />
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default StreamListLoader
