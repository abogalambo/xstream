import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPen,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import defaultCoverImage from '../../../img/default_cover.jpg'
import Avatar from '../../lib/avatar'
import styles from './stream_card.css'

const StreamCard = ({ id, cover, title, author, editable, onDeleteClick }) => {
  const { name, avatar } =  author || {}
  const avatarSrc = avatar && avatar.src

  return (
    <div className={styles.streamCard}>
      <Link to={`/streams/${id}`}>
        <img
          className={styles.streamCard_thumbnail}
          src={cover && cover.src ? cover.src : defaultCoverImage}
        />
        <div className={styles.streamCard_textWrapper}>
          <div className={styles.avatarWrapper}>
            <Avatar src={avatarSrc} size="small" />
          </div>

          <span className={styles.authorName}>
            {name || "Anonymous"}
          </span>

          <h4 className={styles.streamCard_headerText}>{title || "Untitled"}</h4>
        </div>
      </Link>
      <div className={styles.streamCard_iconWrapper}>
        {editable && (
          <>
            <Link
              className={styles.streamCard_icon}
              to={`/streams/${id}/edit`}>
                <FontAwesomeIcon
                  icon={faPen}
                />
            </Link>
            <button
              className={styles.streamCard_icon}
              onClick={() => onDeleteClick(id)}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

StreamCard.propTypes = {
  id: PropTypes.string.isRequired,
  cover: PropTypes.object,
  author: PropTypes.object,
  title: PropTypes.string,
  editable: PropTypes.bool,
  onDeleteClick: PropTypes.func
}

export default StreamCard
