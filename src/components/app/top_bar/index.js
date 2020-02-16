import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import UserInfo from '../user_info'
import styles from './top_bar.css'

const TopBar = () => (
  <header className={styles.header}>
    <nav className={styles.header_nav}>
      <a
        className={styles.header_navButton}
        href="/streams/new"
      >
        <FontAwesomeIcon icon={faPlus} />
        <span>Create</span>
      </a>
      <UserInfo />
    </nav>
  </header>
)

export default TopBar
