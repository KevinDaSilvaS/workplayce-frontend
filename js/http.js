const request = (url, body, headers, method, callback) => {
    if (method == "GET") {
        return fetch(url, {
            method,
            headers,
        })
        .then(response => response.json())
        .then(json => callback(json))
        .catch(err => error(err));
    }

    return fetch(url, {
        method,
        headers,
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(json => callback(json))
    .catch(err => error(err));
};

const error = err => document.getElementById("error").innerHTML = err;