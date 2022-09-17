createBookingsUserView = async () => {
    const page = `<div id="booking-requests"><br></div>
                    <div id="see-more" class="center"></div>`;
    document.getElementById("page-content").innerHTML = page;
    await userBookingsViewFunc();
}

const userBookingsViewFunc = async (limit=10, page=1) => {
    const user_id = getProperty(`user_id`);
    const bookings = await loadBookingsUserRequests(limit, page, user_id);
    await proccessUserBookingRequestsView(bookings);
   /*  if (bookings.length < limit) {
        return loadMoreBookingRequestsUserBtn(limit, page);
    } */
    loadMoreBookingRequestsUserBtn(limit+10, page+1);
}

const loadBookingsUserRequests = async (limit=10, page=1, user_id) => {
    const searchUrl = `${backend_host}/bookings/users/${user_id}?limit=${limit}&page=${page}`;
    const bookings = await request(searchUrl, {}, {}, "GET", result => result)
    if (bookings["error"]) {
        return [];
    }

    return bookings;
}

const loadMoreBookingRequestsUserBtn = (page=1, limit=10) => {
    document.getElementById("see-more").innerHTML = `<br><button class="purple btn" onclick="userBookingsViewFunc(${page}, ${limit});">Ver Mais</button>`;
}

const proccessUserBookingRequestsView = async bookings => await bookings.map(await createBookingUserRequestCard);

const createBookingUserRequestCard = async booking => {
    const options = {
        true: `Aprovado`,
        false: `Booking não aprovado`,
        undefined: `Aguardando aprovação`
    }
    const searchUrl = `${backend_host}/places/${booking.place_id}`;
    const place = await request(searchUrl, {}, {}, "GET", place => place);

    const card = `<hr class=""><div class="purple darken-3 row">
                    <div class="white-text center col s6 m6 g6">
                        <p>Agendamento no ${place.address}, ${place.city}, ${place.country} no dia ${booking.day} de ${months[booking.month]}</p>
                    </div>
                    <div class="white-text center col s6 m6 g6 purple darken-2">
                        <div id="status" class="center">
                            <p>${setStatus(booking, options)}</p>
                        </div>
                    </div>
                </div>`;
    document.getElementById("booking-requests").innerHTML += card;
}

