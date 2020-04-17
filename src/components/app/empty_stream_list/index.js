import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {
  selectedFilterSelector
} from '../../../state/selectors/current_stream_list'

import styles from './empty_stream_list.css'

const EmptyStreamList = () => {
  const selectedFilter = useSelector(selectedFilterSelector)

  return (
    <div className={styles.emptyStreamList}>
      {(selectedFilter == 'featured' || selectedFilter == 'recent') && (
        <p>
          There are no stories for now 😢
        </p>
      )}

      {selectedFilter == 'published' && (
        <p>
          You havent published any stories yet. <br/>

          <Link
            className={styles.createBtn}
            to="/streams/new"
          > 
            <FontAwesomeIcon icon={faPlus} />
            <span>Create</span>
          </Link>
          &nbsp;one now or publish one of your&nbsp;
          <Link
            className={styles.draftsLink}
            to="/drafts"
          >
            drafts
          </Link>
        </p>
      )}

      {selectedFilter == 'drafts' && (
        <p>
          You dont have any drafts. <br />
          <Link
            className={styles.createBtn}
            to="/streams/new"
          > 
            <FontAwesomeIcon icon={faPlus} />
            <span>Create</span>
          </Link>
          &nbsp;one now
        </p>
      )}
    </div>
  )
}

export default EmptyStreamList
