const baseURL = 'https://candidate.neversitup.com/todo/';

const processFetch = (res) => Promise
  .all([res.ok, res.json()])
  .then(([ok, response]) => {
    if (!ok) {
      return Promise.reject(response);
    }
    return Promise.resolve({ data: response });
  });

export default {
  get: (url) => (
    fetch(`${baseURL}${url}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    }).then(processFetch)
  ),
  post: (url, body = {}, withCredential = true) => (
    fetch(`${baseURL}${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
      body: JSON.stringify(body),
    }).then(processFetch)
  ),
  delete: (url, body = {}) => (
    fetch(`${baseURL}${url}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
      body: JSON.stringify(body),
    }).then(processFetch)
  ),
  put: (url, body = {}) => (
    fetch(`${baseURL}${url}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
      body: JSON.stringify(body),
    }).then(processFetch)
  ),
};
