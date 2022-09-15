const request = async (url, body, headers, method, callback) => {
    if (method == "GET") {
        return await fetch(url, {
            method,
            headers,
        })
        .then(response => response.json())
        .then(json => callback(json))
        .catch(err => error(err));
    }

    return await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(json => callback(json))
    .catch(err => error(err));
};

const error = err => document.getElementById("error").innerHTML = err;

const success = () => document.getElementById("error").innerHTML = "";