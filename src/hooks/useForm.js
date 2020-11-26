import React from 'react'

const types = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um email válido',
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/,
    message: 'Sua senha deve ter no mínimo oito caracteres, pelo menos um número, ' +
      'uma letra minúscula, uma letra maiúscula e um caractere especial. '
  }
};
const useForm = (type) => {

  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);

  function validate(value) {
    if (type === false) return true;

    if (value.length === 0) {
      setError('Preencha o campo com algum valor,por favor');
      return false;
    }

    else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    }

    setError(null);
    return true;
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    error,
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value)
  }
}

export default useForm
