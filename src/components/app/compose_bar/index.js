import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faGlobeAmericas
} from '@fortawesome/free-solid-svg-icons'
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
          className={styles.publishBtn}
          onClick={publishStream}
          disabled={!canPublishStream}
        >
          <FontAwesomeIcon icon={streamPublishedAt ? faGlobeAmericas : faPaperPlane} />
          <span>{streamPublishedAt ? 'Published!' : 'Publish'}</span>
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
