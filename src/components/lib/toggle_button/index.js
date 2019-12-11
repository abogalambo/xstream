import React from 'react'
import PropTypes from 'prop-types'
import styles from './toggle_button.css'
import classnames from 'classnames';

const ToggleButton = ({ contents, onToggle, checkedValue, disabled }) => {

  const toggleBtns = contents.map((content, index) => {
    const { text, icon, value } = content;
    return (
      <label
        className={classnames(
          styles.toggleBtn,
          { [styles.toggleBtn_active]: value == checkedValue }
        )}
        key={index + 1}>
          <input
            autoComplete="off"
            checked={value == checkedValue}
            readOnly
            value={value}
            disabled={disabled}
            type="radio"/>
          {text}
          {icon}
      </label>
    )
  })

  return (
    <div
      className={styles.toggleBtnGroup}
      onChange={onToggle}
      data-toggle="buttons">
      {toggleBtns}
    </div>
  )
}

ToggleButton.propTypes = {
  contents: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  checkedValue: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}

export default ToggleButton
