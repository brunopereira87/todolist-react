import React from 'react'
import useFetch from '../../hooks/useFetch'
import styles from './Categories.module.css'
import CategoriesForm from './CategoriesForm';
const Categories = () => {
  const { data, error, loading, request } = useFetch();
  const [newForm, setNewForm] = React.useState(false);
  return (
    <section className={`${styles.categories} mainContainer`}>
      <h2 className="title section-title">Categorias</h2>
      <div className={styles.newCategory}>
        <div className={styles.newCategoryTitle}>
          <p>Nova categoria</p>
          <button className="btn-icon" onClick={() => setNewForm(true)}>
            <i className="fas fa-plus"></i>
          </button>
        </div>

        {newForm && <CategoriesForm setNewForm={setNewForm} />}
      </div>
    </section>
  )
}

export default Categories
