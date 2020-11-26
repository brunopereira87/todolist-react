import React from 'react'
import api_errors from '../apierrors';
const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(null);

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true)
      response = await fetch(url, options);
      json = await response.json();

      if (response.ok === false) throw new Error(json.error.message)

    } catch (err) {
      json = null;
      setError(api_errors[err.message])
    } finally {
      setData(json)
      setLoading(false);

      return { response, json };
    }
  }, [])
  return {
    data,
    error,
    loading,
    request,
    setError,
    setLoading
  }
}

export default useFetch
