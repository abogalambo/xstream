import React from 'react'
import { useSelector } from 'react-redux'
import {
  streamsSelector
} from '../../../state/selectors/current_stream_list'

const StreamList = () => {
  const streams = useSelector(streamsSelector)

  return (
    <>
      { streams.map((stream) => {
        const { id, cover, title } = stream

        return (
          <div>
            { cover && (
              <img src={cover.src} />
            )}
            <h1> { title } </h1>
          </div>
        )
      })}
    </>
  )
}

export default StreamList
