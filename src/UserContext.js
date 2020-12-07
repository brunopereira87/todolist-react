import React from 'react'
import { useNavigate } from 'react-router-dom';
import { LOGIN, USER_GET } from './api';
import { setToken, removeToken, getToken } from './helpers';
import useFetch from './hooks/useFetch';

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
          const { url, options } = USER_GET(token);
          const { response, json } = await request(url, options);

          if (!response.ok) throw new Error('Token inválido ou expirado. Faça o login novamente!');
          storeLoginResponse(json.users[0]);
        } catch (err) {
          setError(err.message);
          userLogout();
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();

  }, [userLogout, setError, request])
  async function userLogin(email, password) {
    const { url, options } = LOGIN({ email, password, returnSecureToken: true });
    const { response, json } = await request(url, options);

    if (response.ok) {
      storeLoginResponse(json);
      navigate('/tarefas');
    }

  }


  function storeLoginResponse(json) {
    let token = getToken();
    if (!token) token = json.idToken

    setToken(token);
    setData(json);
    setLogin(true);
  }
  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const { response, json } = request(url, options);

    if (response.ok) {
      setToken(json.idToken);
      setData(json);
      setLogin(true);
    }

    return json;
  }


  return (
    <UserContext.Provider value={{
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


