import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { publishStream as publishStreamAction } from '../../../state/actions/stream'
import {
  currentStreamSelector,
  canPublishStreamSelector,
  streamPublishedAtSelector
} from '../../../state/selectors/current_stream'
import RemainingTime from '../remaining_time'
import ModeToggle from '../mode_toggle'
import styles from './compose_bar.css'

const ComposeBar = () => {
  const { id } = useSelector(currentStreamSelector) || {}
  const dispatch = useDispatch()
  const publishStream = () => { dispatch(publishStreamAction(id)) }
  const canPublishStream = useSelector(canPublishStreamSelector)
  const streamPublishedAt = useSelector(streamPublishedAtSelector)

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <button
          onClick={publishStream}
          disabled={!canPublishStream}
        >
          {streamPublishedAt ? 'Published!' : 'Publish'}
        </button>
        <div className={styles.remainingTimeContainer}>
          <RemainingTime />
        </div>
        <div className={styles.toggleBtnContainer}>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

export default ComposeBar
