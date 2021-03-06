const API_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/teddies'
    : 'https://backend-for-bears.herokuapp.com/api/teddies';

/**
 * API helper
 * @param {String} endpoint request url
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'} [method] http method
 * @param {Object.<string, string>} [data] request body
 * @returns {Promise<any>} 
 */
async function callApi(endpoint, method = 'GET', data = null) {
    const url = API_URL + endpoint;
    const options = {
        mode: 'cors',
        method,
    };

    if(method === 'POST' && data) {
        Object.assign(options, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    return fetch(url, options)
            .then((res) => (res.ok ? res.json() : Promise.reject(Error('Failed to load'))))
            .then((result) => result)
            .catch((error) => {
                throw error;
            });
}

export { callApi }
