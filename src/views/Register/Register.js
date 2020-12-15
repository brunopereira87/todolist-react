import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SIGNUP } from '../../api';
import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';
import Error from '../../components/helpers/Error';
import useFetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import { UserContext } from '../../UserContext';
import styles from './Register.module.css';

const Register = () => {
  const name = useForm();
  const email = useForm('email');
  const password = useForm('password');

  const { storeLoginResponse } = React.useContext(UserContext);
  const { request, loading, error } = useFetch();
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = SIGNUP({
      name: name.value,
      email: email.value,
      password: password.value
    })
    const { response, json } = await request(url, options);
    console.log('response:', response)
    console.log('json:', json)
    if (response.ok) {
      storeLoginResponse(json);
      navigate('tarefas');
    }

  }

  // // async function signup() {
  // //   const { url, options } = SIGNUP({
  // //     email: email.value,
  // //     password: password.value,
  // //     returnSecureToken: true
  // //   })
  // //   const sign_res = await fetch(url, options);
  // //   const sign_json = await sign_res.json();

  // //   return sign_json;
  // // }

  // async function register(token) {
  //   const { url, options } = REGISTER_USER({
  //     accessToken: token,
  //     displayName: name.value,
  //     returnSecureToken: true
  //   });

  //   const res = await fetch(url, options);
  //   const json = res.json();

  //   return json;
  // }
  return (
    <section className={styles.register}>
      <h2 className="title">Registrar</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input type="text" name="name" label="Nome" {...name} />
        <Input type="email" name="email" label="E-mail" {...email} />
        <Input type="password" name="password" label="Senha" {...password} />
        {loading ? (
          <Button disabled>...Enviando</Button>
        ) : (
            <Button>Enviar</Button>
          )}
      </form>
      <Error error={error} />
    </section>
  )
}

export default Register
