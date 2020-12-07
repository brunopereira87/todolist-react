import React from 'react'
import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';
import useForm from '../../hooks/useForm'
import styles from './CategoriesForm.module.css'
const CategoriesForm = ({ setNewForm }) => {

  const category = useForm();

  async function handleSubmit(event){
    event.preventDefault();
    
    

  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input type="text" className="dunha" name="category" {...category} />
      <button className="btn-icon btn-icon-second">
        <i className="fas fa-check"></i>
      </button>
      <button
        onClick={() => setNewForm(false)}
        type="button"
        className="btn-icon btn-icon-second">
        <i className="fas fa-times"></i>
      </button>
    </form>
  )
}

export default CategoriesForm
