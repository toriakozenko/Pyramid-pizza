import React from 'react'
import styles from './styles.module.css';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <span>😔</span>
      <h1>This page is not found!</h1>
      <p className={styles.description}>Sorry, but this page is not available!</p>
    </div>
  )
}

export default NotFoundBlock;