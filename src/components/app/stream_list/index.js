import React from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import {
  streamsSelector
} from '../../../state/selectors/current_stream_list'
import ImageDisplay from '../../lib/image_display'
import defaultCoverImage from '../../../img/default_cover.jpg'
import styles from './stream_list.css'

const StreamList = () => {
  const streams = useSelector(streamsSelector)

  return (
    <div className={styles.streamList}>
      { streams.map((stream) => {
        const { id, cover, title } = stream

        return (
          <a
            href={`/streams/${id}`}
            className={styles.listItem}
            key={`stream_thumbnail_${id}`}
          >
            <a
              className={styles.editLink}
              href={`/streams/${id}/edit`}
            >
              <FontAwesomeIcon icon={faPen}/>
            </a>
            <ImageDisplay
              src={cover && cover.src ? cover.src : defaultCoverImage}
              caption={title || "Untitled Stream"}
              style="COVER"
              editable={false}
            />
          </a>
        )
      })}
    </div>
  )
}

export default StreamList
