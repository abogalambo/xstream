import React from 'react'
import RemainingTime from '../remaining_time'
import ModeToggle from '../mode_toggle'

import styles from './compose_bar.css'

const ComposeBar = () => (
  <header className={styles.header}>

    <div className={styles.topBar}>
      <div className={styles.remainingTimeContainer}>
        <RemainingTime />
      </div>
      <div className={styles.toggleBtnContainer}>
        <ModeToggle />
      </div>
    </div>
  </header>
)

export default ComposeBar
