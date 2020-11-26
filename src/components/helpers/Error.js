import React from 'react'
import styles from './Error.module.css'
const Error = ({ error }) => {
  if (!error) return null;

  return (
    <div className={styles.error}>
      <p>{error}</p>
    </div>
  )
}

export default Error
