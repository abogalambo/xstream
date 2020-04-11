import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from "react-router-dom"
import {
  selectedFilterSelector
} from '../../../state/selectors/current_stream_list'
import {
  setSelectedFilter
} from '../../../state/actions/stream_list'
import classnames from 'classnames'
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
      <Link
        className={classnames(
          styles.filter,
          { [styles.filterActive]: urlFilter == 'featured' }
        )}
        to="/featured"
       >
        Featured
      </Link>
      <Link
        className={classnames(
          styles.filter,
          { [styles.filterActive]: urlFilter == 'recent' }
        )}
        to="/recent"
       >
        Recent
      </Link>
    </div>
  )
}

export default StreamListFilters
