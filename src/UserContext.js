import React from 'react'
import { useNavigate } from 'react-router-dom';
import { UPDATE_TOKEN, LOGIN, USER_AUTH } from './api';
import { setToken, removeToken, getToken } from './helpers';
import useFetch from './hooks/useFetch';
import md5 from 'crypto-js/md5';

export const UserContext = React.createContext();
export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const { request, error, loading, setError, setLoading } = useFetch();
  const navigate = useNavigate();

  const userLogout = React.useCallback(async function () {
    setData(null);
    setLogin(false);
    removeToken();
    setError(null);
    setLoading(false);
    navigate('/login');
  }, [navigate, setError, setLoading])
  React.useEffect(() => {
    async function autoLogin() {
      const token = getToken();

      if (token) {
        try {
          const { url, options } = USER_AUTH(token);
          const { response, json } = await request(url, options);

          if (!response.ok) throw new Error('Token inválido ou expirado. Faça o login novamente!');
          storeLoginResponse(json[0]);
        } catch (err) {
          setError(err.message);
          console.log(err.message);
          userLogout();
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();

  }, [userLogout, setError, request])
  async function userLogin(email, password) {

    try {
      const hashBase = email + Date.now() + Math.floor(Math.random() * (100 - 1))
      const accessToken = md5(hashBase).toString()
      const tokenExpire = Date.now() + (1000 * 60 * 60);

      let api_obj = LOGIN(email, password);
      let url = api_obj.url
      let options = api_obj.options

      let request_obj = await request(url, options);
      let response = request_obj.response;
      let json = request_obj.json;

      if (response.ok === false) throw new Error('Email ou senha incorretos');
      api_obj = UPDATE_TOKEN(json[0].id, { accessToken, tokenExpire });
      url = api_obj.url
      options = api_obj.options
      request_obj = await request(url, options);
      response = request_obj.response;
      json = request_obj.json;
      storeLoginResponse(json);
      navigate('/tarefas');
    } catch (err) {
      setError(err.message);
    }

  }

  function storeLoginResponse(json) {
    let token = getToken();
    if (!token) token = json.accessToken

    setToken(token);
    setData(json);
    setLogin(true);
  }
  async function getUser(token) {
    const { url, options } = USER_AUTH(token);
    const { response, json } = request(url, options);

    if (response.ok) {
      setToken(json.accessToken);
      setData(json);
      setLogin(true);
    }

    return json;
  }


  return (
    <UserContext.Provider value={{
      login,
      userLogin,
      setLogin,
      getUser,
      userLogout,
      storeLoginResponse,
      data, error, loading, login
    }}>
      {children}
    </UserContext.Provider>
  )
};


