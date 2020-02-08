import React from 'react'
import styles from './spinner.css'

const Spinner = () => (
  <div className={styles.wrapper}>
    <progress className={styles.spinner}/>
  </div>
)

export default Spinner
