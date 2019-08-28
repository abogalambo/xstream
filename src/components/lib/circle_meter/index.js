import React from 'react';
import PropTypes from 'prop-types';
import styles from './circle_meter.css';

const CircleMeter = ({percentage}) => {
  const r = 9;
  const c = 2 * Math.PI * r ;
  const progress = ((100 - percentage) / 100) * c;
  const progressStr = progress.toString();

  return (
    <div className={styles.wrapper}>
      <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20">
        <circle className={styles.background}
          cx={"50%"}
          cy={"50%"}
          r={r.toString()} />
        <circle className={styles.meter}
          cx={"50%"}
          cy={"50%"}
          r={r}
          strokeDasharray={c.toString()}
          strokeDashoffset={progressStr}/>
    </svg>
  </div>
  )
}

CircleMeter.propTypes = {
  percentage: PropTypes.number.isRequired
}

export default CircleMeter;
