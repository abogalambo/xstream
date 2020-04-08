import React from 'react'
import PropTypes from 'prop-types'
import styles from './avatar.css'
import defaultAvatar from '../../../img/default_avatar.png'

const Avatar = ({src}) => (
  <figure className={styles.avatar}>
    <img src={src ? src : defaultAvatar} />
  </figure>
)

Avatar.propTypes = {
  src: PropTypes.string
}

export default Avatar
