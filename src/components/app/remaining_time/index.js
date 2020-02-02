import React from 'react'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import styles from './remaining_time.css'
import {
  remainingTimeSelector
} from '../../../state/selectors/current_stream'
import config from '../../../../config'

const RemainingTime = () => {
  const radius = 8;
  const circumference = 2 * Math.PI * radius
  const remainingTime = Math.max(useSelector(remainingTimeSelector), 0)
  const maxDuration = config.stream.maxDuration

  const streamDuration = maxDuration - remainingTime
  const ratio = Math.min(1, streamDuration / maxDuration)
  const progress = ratio * circumference / 2

  const readableRemainingTime = stringFormat(remainingTime)
  
  return (
    <div className={classnames(
      styles.remainingTime, {
        [styles.green]: remainingTime >= 60000,
        [styles.yellow]: remainingTime < 60000 && remainingTime >= 1000,
        [styles.red]: remainingTime < 1000
      }
    )}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <circle className={styles.outer}
          cx={"50%"}
          cy={"50%"}
          r={radius}
          fill="transparent"
        />
        <circle className={styles.inner}
          cx={"50%"}
          cy={"50%"}
          r={radius / 2}
          strokeDasharray={`${progress} ${circumference}`}
          transform="rotate(-90) translate(-20)"
        />
      </svg>
      <span>{`${readableRemainingTime} left`}</span>
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
