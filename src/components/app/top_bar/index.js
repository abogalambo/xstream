import React from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { triggerLoginUI as triggerLoginUIAction } from '../../../state/actions/auth'
import styles from './top_bar.css'

const TopBar = () => {
  const dispatch = useDispatch()
  const triggerLoginUI = () => { dispatch(triggerLoginUIAction()) }

  return (
    <header className={styles.header}>
      <nav className={styles.header_nav}>
        <a
          className={styles.header_navButton}
          href="/streams/new"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Create</span>
        </a>
        <a
          className={styles.header_navLink}
          onClick={triggerLoginUI}
          href="#"
        >
          Login
        </a>
      </nav>
    </header>
  )
}

export default TopBar
