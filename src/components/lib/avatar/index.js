import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './avatar.css'
import defaultAvatar from '../../../img/default_avatar.png'

const Avatar = ({src, size}) => (
  <figure className={classnames(
    styles.avatar,
    styles[`avatar_${size}`]
  )}>
    <img src={src ? src : defaultAvatar} />
  </figure>
)

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOf(['tiny', 'small', 'large']).isRequired
}

export default Avatar
