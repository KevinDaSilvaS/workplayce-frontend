const createBookingsRequestPage = async () => {
    const page = `<div class="container" id="booking-requests"></div>
                    <div id="see-more" class="center"></div>`;

    document.getElementById("page-content").innerHTML = page;
    await compViewFunc();
}

const compViewFunc = async (limit=10, page=1) => {
    const company_id = getProperty("user_id")
    const bookings = await loadBookingsCompanyRequests(limit, page, company_id);
    await proccessBookingCompanyView(bookings);
    loadMoreBookingRequestsBtn(limit+10, page+1, company_id);
}

const proccessBookingCompanyView = async bookings => await bookings.map(async booking => await createBookingCard(booking));

const loadBookingsCompanyRequests = async (limit=10, page=1, company_id) => {
    const searchUrl = `${backend_host}/bookings/companies/${company_id}?limit=${limit}&page=${page}`;
    const bookings = await request(searchUrl, {}, {}, "GET", async bookings => bookings);
    if (bookings["error"]) {
       error(bookings["error"]);
    }

    return bookings;
}

const loadMoreBookingRequestsBtn = (page=10, limit=1, company_id) => {
    document.getElementById("see-more").innerHTML = `<button class="purple btn" onclick="compViewFunc(${page}, ${limit}, '${company_id}');">Ver Mais</button>`;
}

const setApproval =  (approvalStatus, booking_id) => {
    const upadateBookingsUrl = `${backend_host}/bookings/${booking_id}`;
    const token_id = getProperty("token_id");
    request(upadateBookingsUrl, 
        { approved: approvalStatus }, 
        { "auth-token": token_id }, 
        "PATCH", 
        async bookingStatus => {
            if (bookingStatus["error"]) {
                return;
            }
        
            return redirect(window.location.href);
        });
}

const createBookingCard = async booking => {
    const options = {
        true: (_booking_id) => `<h5 class="white-text">Aprovado</h5>`,
        false:(_booking_id) => `<h5 class="white-text">Booking não aprovado</h5>`,
        undefined: (booking_id) => `<a onclick="setApproval(true, '${booking_id}')" class="btn purple">Aprovar</a>
                    <a onclick="setApproval(false, '${booking_id}')" class="btn purple">Recusar</a>`
    }

    const userUrl = `${backend_host}/users/${booking.user_id}`;
    const userData = await request(userUrl, {}, {}, "GET", async user => user);
    if (userData["error"]) {
        error(userData["error"]);
        return;
    }

    const placeUrl = `${backend_host}/places/${booking.place_id}`;
    const placeData = await request(placeUrl, {}, {}, "GET", async place => place);
    if (placeData["error"]) {
        error(placeData["error"]);
        return;
    }

    const card = `<div class="card purple darken-3">
                <div class="card-content white-text center">
                    <p>Agendamento no escritório ${placeData.address}, ${placeData.city}, ${placeData.country} no dia ${booking.day} de ${months[booking.month]}</p>
                </div>
                <div class="card-content white-text purple darken-2 white-text">
                    <div id="user">
                        <h5 class="center white-text">${userData.username}</h5>
                        <div>${userData.description}</div>
                        <ul>
                            <li>Email: ${userData.email}</li>
                        </ul>
                    </div>
                    <div id="status" class="center">
                        ${setStatus(booking, options)}
                    </div>
                </div>
            </div>`;
    document.getElementById("booking-requests").innerHTML += card;
}

const setStatus = (booking, options) => options[booking["approved"]](booking._id)