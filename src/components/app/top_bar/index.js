import React from 'react'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faHome } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import UserInfo from '../user_info'
import styles from './top_bar.css'

const TopBar = () => (
  <header className={styles.header}>
    <nav className={styles.header_nav}>
      <Link
        className={classnames(styles.navItem, styles.homeBtn)}
        to="/"
      >
        <FontAwesomeIcon icon={faHome} />
      </Link>

      <Link
        className={classnames(styles.navItem, styles.createBtn)}
        to="/streams/new"
      >
        <FontAwesomeIcon icon={faPlus} />
        <span>Create</span>
      </Link>

      <div className={classnames(styles.navItem, styles.userInfo)}>
        <UserInfo />
      </div>
    </nav>
  </header>
)

export default TopBar
