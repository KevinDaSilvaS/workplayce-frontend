const getFromLocalStorage = key => localStorage.getItem(key);

const getFromCookie = key => {
    //https://www.w3schools.com/js/js_cookies.asp
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return undefined;
};

const getProperty = key => {
    value = getFromLocalStorage(key);
    if (!value) {
        return getFromCookie(key);
    }
    return value;
}