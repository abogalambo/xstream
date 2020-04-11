import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from "react-router-dom"
import {
  selectedFilterSelector
} from '../../../state/selectors/current_stream_list'
import {
  setSelectedFilter
} from '../../../state/actions/stream_list'
import styles from './stream_list_filters.css'

const StreamListFilters = () => {
  const defaultFilter = 'featured'
  const selectedFilter = useSelector(selectedFilterSelector)

  const { filter: urlFilter = defaultFilter} = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    if(urlFilter != selectedFilter) {
      dispatch(setSelectedFilter(urlFilter))
    }
  }, [urlFilter])

  return (
    <div className={styles.streamListFilters}>
      <Link to="/featured"> Featured</Link>
      <Link to="/recent"> Recent</Link>
    </div>
  )
}

export default StreamListFilters
