const urls = {
    USER: "google.com",
    COMPANY: "google.com"
}

const redirect = () => {
    let userType = getProperty('user_type');
    if (userType) {
        window.location.href = urls[userType];
    }
}

