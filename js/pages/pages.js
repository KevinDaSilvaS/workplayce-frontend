const setPage = () => {
    const pageContentUser = {
        bookings: createBookingsUserView,
        places: createPlacesPage
    };
    
    const pageContentCompany = {
        bookings: createBookingsRequestPage,
        places: createViewPlacesPage,
        edit_company: () => ""
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