import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';
import ErrorComponent from '../../components/helpers/Error';
import useForm from '../../hooks/useForm'
import { UserContext } from '../../UserContext';
import styles from './Login.module.css'
const Login = () => {
  const { login, userLogin, error, loading } = React.useContext(UserContext);
  const navigate = useNavigate();

  if (login) navigate('/tarefas');

  const email = useForm('email');
  const password = useForm();

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

        <ErrorComponent error={error} />
      </form>
    </section>
  )
}

export default Login
