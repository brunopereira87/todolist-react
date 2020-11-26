import React from 'react'
import styles from './CategoriesItem.module.css'
const CategoriesItem = ({ category }) => {
  return (
    <div className={styles.category}>
      <h3>{category.name}</h3>
    </div>
  )
}

export default CategoriesItem
