import React from 'react'
import { useSelector } from 'react-redux'
import styles from './remaining_time.css'
import {
  remainingTimeSelector
} from '../../../state/selectors/current_stream'
import config from '../../../../config'

const RemainingTime = () => {
  const remainingTime = useSelector(remainingTimeSelector)
  const maxDuration = config.stream.maxDuration

  const streamDuration = maxDuration - remainingTime
  const percent = 100 * streamDuration / maxDuration

  const readableStreamDuration = stringFormat(streamDuration)
  const readableMaxDuration = stringFormat(maxDuration)

  return (
    <div className={styles.remainingTime}>
      <span>{`${readableStreamDuration} / ${readableMaxDuration}`}</span>
    </div>
  )
}

const stringFormat = (millis) => {
  const minutes = parseInt(millis / 60000)
  const seconds = parseInt((millis % 60000) / 1000)
  return `${pad(minutes)}:${pad(seconds)}`
}

const pad = (n) => n < 10 ? `0${n}` : `${n}`

export default RemainingTime;