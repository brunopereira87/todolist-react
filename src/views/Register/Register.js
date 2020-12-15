import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SIGNUP, GET_USER_BY_EMAIL } from '../../api';
import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';
import ErrorComponent from '../../components/helpers/Error';
import useFetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import { UserContext } from '../../UserContext';
import styles from './Register.module.css';
import md5 from 'crypto-js/md5';
const Register = () => {
  const name = useForm();
  const email = useForm('email');
  const password = useForm();

  const { storeLoginResponse } = React.useContext(UserContext);
  const { request, loading, error, setError } = useFetch();
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();

    // const { url, options } = SIGNUP({
    //   name: name.value,
    //   email: email.value,
    //   password: password.value
    // })
    const hashBase = email + Date.now() + Math.floor(Math.random() * (100 - 1))
    const accessToken = md5(hashBase).toString()
    const tokenExpire = Date.now() + (1000 * 60 * 60);

    let api_obj = GET_USER_BY_EMAIL(email.value);
    let url = api_obj.url
    let options = api_obj.options

    try {
      let request_obj = await request(url, options);
      let response = request_obj.response;
      let json = request_obj.json;
      // const { response, json } = await request(url, options);
      console.log('response:', response)
      console.log('json:', json)
      if (response.ok === false) throw new Error('Erro ocorrido');
      console.log('cu')
      if (json.length > 0) throw new Error('Email já cadastado')
      api_obj = SIGNUP({
        name: name.value,
        email: email.value,
        password: password.value,
        accessToken,
        tokenExpire
      })

      url = api_obj.url
      options = api_obj.options
      request_obj = await request(url, options);
      response = request_obj.response;
      json = request_obj.json;

      console.log('response:', response)
      console.log('json:', json)
      // if (response.ok) {
      //   storeLoginResponse(json);
      //   navigate('tarefas');
      // }
    } catch (error) {
      setError(error.message);
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
      <ErrorComponent error={error} />
    </section>
  )
}

export default Register
