import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import defaultCoverImage from '../../../img/default_cover.jpg'
import styles from './stream_card.css'

const StreamCard = ({ id, cover, title, editable }) => {
  return (
    <div className={styles.streamCard}>
      <a href={`/streams/${id}`}>
        <img
          className={styles.streamCard_thumbnail}
          src={cover && cover.src ? cover.src : defaultCoverImage} />
        <div className={styles.streamCard_textWrapper}>
          <h4 className={styles.streamCard_headerText}>{title || "Untitled"}</h4>
        </div>
      </a>
      {editable && (
        <a
          className={styles.streamCard_icon}
          href={`/streams/${id}/edit`}>
            <FontAwesomeIcon
              icon={faPen}
            />
            <span>Edit</span>
        </a>
      )}
    </div>
  )
}

StreamCard.propTypes = {
  id: PropTypes.string.isRequired,
  cover: PropTypes.object,
  title: PropTypes.string,
  editable: PropTypes.bool
}

export default StreamCard
