const setPage = () => {
    const pageContentUser = {
        bookings: createBookingsUserView,
        places: createPlacesPage,
        book: () => "",
        edit_profile: () => ""
    };
    
    const pageContentCompany = {
        bookings: createBookingsRequestPage,
        places: createViewPlacesPage,
        edit_company: () => "",
        add_booking: createAddBookingsPage,
        edit_profile: () => ""
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