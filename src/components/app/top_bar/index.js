import React from 'react'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faHome } from '@fortawesome/free-solid-svg-icons'
import UserInfo from '../user_info'
import styles from './top_bar.css'

const TopBar = () => (
  <header className={styles.header}>
    <nav className={styles.header_nav}>
      <a
        className={classnames(styles.navItem, styles.homeBtn)}
        href="/"
      >
        <FontAwesomeIcon icon={faHome} />
      </a>

      <a
        className={classnames(styles.navItem, styles.createBtn)}
        href="/streams/new"
      >
        <FontAwesomeIcon icon={faPlus} />
        <span>Create</span>
      </a>

      <div className={classnames(styles.navItem, styles.userInfo)}>
        <UserInfo />
      </div>
    </nav>
  </header>
)

export default TopBar
