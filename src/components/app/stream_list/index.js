import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  streamsSelector
} from '../../../state/selectors/current_stream_list'
import {
  currentUserSelector
} from '../../../state/selectors/current_user'
import { canEditStream } from '../../../lib/stream_permissions'
import {
  deleteStream as deleteStreamAction
} from '../../../state/actions/stream'
import StreamCard from '../stream_card'
import styles from './stream_list.css'

const StreamList = () => {
  const streams = useSelector(streamsSelector)
  const { uid } = useSelector(currentUserSelector) || {}

  const dispatch = useDispatch()
  const deleteStream = (id) => dispatch(deleteStreamAction(id))

  return (
    <div className={styles.streamList}>
      { streams.map((stream) => {
        const { id, cover, title, author } = stream

        return (
          <StreamCard
            key={`stream_thumbnail_${id}`}
            id={id}
            cover={cover}
            title={title}
            author={author}
            onDeleteClick={deleteStream}
            editable={canEditStream(stream, uid)}
         />
       )
      })}
    </div>
  )
}

export default StreamList
