import React from 'react';
import PropTypes from 'prop-types';
import styles from './circle_meter.css';

const CircleMeter = ({percentage}) => {
  const radius = 9;
  const circumference = 2 * Math.PI * radius ;
  const progress = ((100 - percentage) / 100) * circumference;

  return (
    <div className={styles.wrapper}>
      <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20">
        <circle className={styles.background}
          cx={"50%"}
          cy={"50%"}
          r={radius} />
        <circle className={styles.meter}
          cx={"50%"}
          cy={"50%"}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={progress}/>
    </svg>
  </div>
  )
}

CircleMeter.propTypes = {
  percentage: PropTypes.number.isRequired
}

export default CircleMeter;
