import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import styles from './top_bar.css'

const TopBar = () => {
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
          href="#"
        >
          Login
        </a>
      </nav>
    </header>
  )
}

export default TopBar
