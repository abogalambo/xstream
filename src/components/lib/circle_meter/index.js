import React from 'react';
import styles from './circle_meter.css';

const CircleMeter = ({percentage}) => {
  const strokeWidth = 6
  const dimension = 53.28
  const radius = (dimension - strokeWidth) / 2;
  const circle = Math.PI * (radius * 2);

  const circleStr = circle.toString()
  const dimensionStr = dimension.toString() + 'px';
  const center = (radius + (strokeWidth / 2)).toString();
  const r = radius.toString();
  const strokeWidthStr = strokeWidth.toString()

  const progress = ((100 - percentage) / 100) * circle;
  const progressStr = progress.toString();

  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width={dimensionStr}
      height={dimensionStr}>
      <circle className={styles.background}
        cx={center}
        cy={center}
        r={r}
        strokeWidth={strokeWidthStr}
        strokeDasharray={circleStr}
        strokeDashoffset="0" />
      <circle className={styles.meter}
        cx={center}
        cy={center}
        r={r}
        strokeWidth={(strokeWidth+0.4).toString()}
        strokeDasharray={circleStr}
        strokeDashoffset={progressStr}/>
  </svg>
  )
}

export default CircleMeter;
