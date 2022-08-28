const loggedUrls = {
    USER: "google.com",
    COMPANY: "google.com"
}

const redirect = (url = "") => {
    if (url != "") {
        return window.location.href = url;
    }

    const userType = getProperty('user_type');
    if (userType) {
        window.location.href = loggedUrls[userType];
    }
}

