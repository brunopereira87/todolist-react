import React from 'react'
import styles from './Input.module.css';

const Input = ({ type, label, value, name, onBlur, error, onChange }) => {
  return (
    <div className={styles.input}>
      <label htmlFor={name}>{label}</label>
      <input type={type} value={value} id={name} name={name}
        onBlur={onBlur} onChange={onChange} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default Input
