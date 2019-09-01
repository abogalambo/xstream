import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './circle_meter.css';

const CircleMeter = ({startedAt, isInProgress, offset, duration}) => {
  console.log(startedAt, isInProgress, offset, duration)
  const elapsedTime = isInProgress ? (new Date().getTime() - startedAt) : offset
  const percentage = Math.ceil(100 * elapsedTime / duration)

  const radius = 9.5;
  const circumference = 2 * Math.PI * radius ;
  const progress = ((100 - percentage) / 100) * circumference;

  const [ blah, setBlah ] = useState(true);
  const triggerRender = () => setBlah(!blah);

  useEffect(() => {
    const id = setInterval(triggerRender, 100);
    return () => clearInterval(id);
  });

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
  startedAt: PropTypes.number,
  isInProgress: PropTypes.bool,
  offset: PropTypes.number,
  duration: PropTypes.number
}

export default CircleMeter;
