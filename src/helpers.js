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
  "fas fa-at",
  "fas fa-baby-carriage",
  "fas fa-baby",
  "fas fa-biking",
  "fas fa-book",
  "fas fa-book-reader",
  "fas fa-business-time",
  "fas fa-camera-retro",
  "fas fa-cart-arrow-down",
  "fas fa-dog",
  "fas fa-futbol",
  "fas fa-gamepad",
  "fas fa-heart",
  "fas fa-laptop",
  "fas fa-money-bill",
  "fas fa-paint-brush",
  "fas fa-pen",
  "fas fa-phone",
  "fas fa-school",
  "fas fa-shopping-cart",
  "fas fa-swimmer",
  "fas fa-umbrella-beach"
]