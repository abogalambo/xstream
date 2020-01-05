import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './cover_overview.css'

const CoverOverview = ({coverData, isSelected, onCoverClick}) => {
  const { title, cover } = coverData
  const hasCoverImage = cover && cover.src
  const coverStyle = hasCoverImage ? {
    backgroundImage: `url(${cover.src})`
  } : {}

  return (
    <div
      className={classnames(
        styles.coverOverview,
        { [styles.selected]: isSelected }
      )}
      style={coverStyle}
      onClick={onCoverClick}
    >
      <p className={styles.coverOverviewText}>{ title }</p>
    </div>
  )
}

CoverOverview.propTypes = {
  coverData: PropTypes.object.isRequired,
  onCoverClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool
}

export default CoverOverview
