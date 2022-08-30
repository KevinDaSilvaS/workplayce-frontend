const setPage = () => {
    const pageContentUser = {
        bookings: () => "",
        places: createPlacesPage
    };
    
    const pageContentCompany = {
        bookings: () => "",
        places: () => ""
    };

    const page = new URLSearchParams(window.location.search).get("page");
    const userType = getProperty("user_type");

    if (userType == "USER") {
        pageContentUser[page]();
    }

    if (userType == "COMPANY") {
        pageContentCompany[page]();
    }
    
}