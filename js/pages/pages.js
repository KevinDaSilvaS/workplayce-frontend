const setPage = () => {
    const pageContentUser = {
        bookings: createBookingsUserView,
        places: createPlacesPage,
        book: createAddBookingsPage,
        edit_profile: () => ""
    };
    
    const pageContentCompany = {
        bookings: createBookingsRequestPage,
        places: createViewPlacesPage,
        edit_company: () => "",
        add_booking: () => "",
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