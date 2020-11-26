export const getToken = () => {
  const token = window.localStorage.getItem('idToken');
  return token;
};

export const setToken = (token) => {
  window.localStorage.setItem('idToken', token);
};
export const removeToken = () => {
  window.localStorage.removeItem('idToken');
}

export const filterObjects = (obj_arrays, ids_array) => {
  const objs = obj_arrays.filter(obj => {
    return ids_array.find(id => id === obj.id);
  });

  return objs;
}

export const categoriesIconsList = [
  ""
]