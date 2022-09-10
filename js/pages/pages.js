const setPage = () => {
    const pageContentUser = {
        bookings: createBookingsUserView,
        places: createPlacesPage,
        book: createAddBookingsPage,
        edit_profile: createEditProfilePage
    };
    
    const pageContentCompany = {
        bookings: createBookingsRequestPage,
        places: createViewPlacesPage,
        edit_place: createPlacesForm,
        add_place: createPlacesForm,
        add_availability: createAddAvailabilityPage,
        edit_profile: createEditProfilePage
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