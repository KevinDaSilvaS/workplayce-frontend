const loggedUrls = {
    USER: "google.com",
    COMPANY: "google.com"
}

const redirect = (url = "") => {
    if (url != "") {
        return window.location.href = url;
    }

    const userType = getProperty('user_type');
    const tokenId = getProperty('token_id');
    if (userType && tokenId) {
        window.location.href = loggedUrls[userType];
    }
}

