const API_URL_DEV = '';

async function callApi(endpoint, method = 'GET', data = null) {
    const url = API_URL_DEV + endpoint;
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
    };

    return fetch(url, options)
            .then((res) => (res.ok ? res.json() : Promise.reject(Error('Failed to load'))))
            .then((result) => console.log(result))
            .catch((error) => {
                throw error;
            });
}

export { callApi }
