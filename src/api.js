export const API_KEY = 'AIzaSyBEzk96h51_HpUMPQmDDkh3P9AWZcfqvqc';
export const AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:`
export const SIGNUP_URL = `${AUTH_URL}signUp?key=${API_KEY}`;
export const LOGIN_URL = `${AUTH_URL}signInWithPassword?key=${API_KEY}`;
export const DB_URL = 'https://to-do-list-3bf7f.firebaseio.com'

export const REGISTER_USER = (body) => {
  return {
    url: `${AUTH_URL}update?key=${API_KEY}`,
    options: {
      method: 'POST',
      body: JSON.stringify(body)
    }
  }
}

export const SIGNUP = (body) => {
  return {
    url: SIGNUP_URL,
    options: {
      method: 'POST',
      body: JSON.stringify(body)
    }
  }
}
export const LOGIN = (body) => {
  return {
    url: LOGIN_URL,
    options: {
      method: 'POST',
      body: JSON.stringify(body)
    }
  }
}

export const USER_GET = (token) => {
  return {
    url: `${AUTH_URL}lookup?key=${API_KEY}`,
    options: {
      method: 'POST',
      body: JSON.stringify({ idToken: token })
    }
  }
}