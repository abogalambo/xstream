import React from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {
  streamsSelector
} from '../../../state/selectors/current_stream_list'
import StreamCard from '../stream_card'
import styles from './stream_list.css'

const StreamList = () => {
  const streams = useSelector(streamsSelector)

  return (
    <div className={styles.streamList}>
      { streams.map((stream) => {
        const { id, cover, title } = stream

        return (
          <StreamCard
            key={`stream_thumbnail_${id}`}
            id={id}
            cover={cover}
            title={title}
         />
       )
      })}
      <a
        className={styles.addStreamLink}
        href="/streams/new"
      >
        <FontAwesomeIcon
          icon={faPlus}
        />
        <span>Create</span>
      </a>
    </div>
  )
}

export default StreamList
