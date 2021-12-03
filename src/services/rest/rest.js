const api = {
  get(url) {
    return api.fetchJson(url);
  },

  post(url, data) {
    return api.fetchJson(url, {
      body: JSON.stringify(data),
      method: 'POST',
    });
  },

  delete(url, data) {
    return api.fetchJson(url, {
      body: JSON.stringify(data),
      method: 'DELETE',
    });
  },

  put(url, data) {
    return api.fetchJson(url, {
      body: JSON.stringify(data),
      method: 'PUT',
    });
  },

  fetchJson(url, params) {
    return new Promise((resolve, reject) => {
      this.fetch(url, params)
        .then(parseJSON)
        .then((response) => {
          if (response.ok) {
            return resolve(response.json);
          }

          const err = new Error(response.json.message);
          err.status = response.status;
          return reject(err);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  fetch(url, params = {}) {
    const options = {
      ...params,
    };

    // native call
    return fetch(url, options);
  },
};

function parseJSON(response) {
  return new Promise((resolve, reject) => response
    .json()
    .then((json) => resolve({ status: response.status, ok: response.ok, json }))
    .catch((err) => reject(err)));
}

export default api;
