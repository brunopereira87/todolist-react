import React from 'react'
import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';
import Error from '../../components/helpers/Error';
import useForm from '../../hooks/useForm'
import { UserContext } from '../../UserContext';
import styles from './Login.module.css'
const Login = () => {
  const email = useForm('email');
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(UserContext);
  async function handleSubmit(event) {
    event.preventDefault();
    if (email.validate() && password.validate()) {
      userLogin(email.value, password.value)
    }

  }
  return (
    <section className={styles.login}>
      <h2 className="title">Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input type="email" name="email" label="E-mail" {...email} />
        <Input type="password" name="password" label="Senha" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
            <Button>Enviar</Button>
          )}

        <Error error={error} />
      </form>
    </section>
  )
}

export default Login
