import React from 'react';
import styles from './styles.module.css';

const Weather: React.FC = React.memo(() => {
  return <div className={styles.weather}>информер погоды в столице страны</div>;
});
export default Weather;
