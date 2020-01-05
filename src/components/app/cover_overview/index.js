import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './cover_overview.css'

const CoverOverview = ({coverData, isSelected, onCoverClick}) => {
  const { title, cover } = coverData
  return (
    <div
      className={classnames(
        styles.coverOverview,
        { [styles.selected]: isSelected }
      )}
      onClick={onCoverClick}
    >
      <p className={styles.coverOverviewText}>{ title }</p>
      { cover && (
        <img src={cover.src} />
      )}
    </div>
  )
}

CoverOverview.propTypes = {
  cover: PropTypes.object.isRequired,
  onCoverClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool
}

export default CoverOverview
