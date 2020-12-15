export const API_KEY = 'AIzaSyBEzk96h51_HpUMPQmDDkh3P9AWZcfqvqc';
export const AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:`
export const BASE_URL = 'http://localhost:3001';
export const SIGNUP_URL = `${BASE_URL}/register`;
export const USERS_URL = `${BASE_URL}/users`;

export const REGISTER_USER = (body) => {
  return {
    url: SIGNUP_URL,
    options: {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    }
  }
}

export const SIGNUP = (body) => {
  return {
    url: SIGNUP_URL,
    options: {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    }
  }
}
export const GET_USER_BY_CREDENTIALS = (email, password) => {

  return {
    url: `${USERS_URL}?email=${email}&password=${password}`,
    options: {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    }
  }
}
export const LOGIN = (id, body) => {
  const { accessToken, tokenExpire } = body;
  console.log('ID:', id)
  return {
    url: `${USERS_URL}/${id}`,
    options: {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        accessToken,
        tokenExpire
      })
    }
  }
}
export const USER_AUTH = (endpoint) => {
  return {
    url: `${BASE_URL}/600/${endpoint}`,
    options: {
      method: 'GET',
    }
  }
}

export const CATEGORY_POST = (token) => {
  return {
    url: `${BASE_URL}/categories.json?key=${API_KEY}`,
    options: {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ accessToken: token })
    }
  }
}