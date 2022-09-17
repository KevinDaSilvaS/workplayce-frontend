const createBookingsRequestPage = () => {
    const page = `<div class="container" id="booking-requests"></div>
                    <div id="see-more" class="center"></div>`;

    document.getElementById("page-content").innerHTML = page;
    compViewFunc();
}

const compViewFunc = (limit=1, page=10) => {
    const bookings = loadBookingsCompanyRequests(limit, page);
    proccessBookingCompanyView(bookings);
    loadMoreBookingRequestsBtn(limit, page);
}

const proccessBookingCompanyView = bookings => bookings.map(booking => createBookingCard(booking));

const loadBookingsCompanyRequests = (limit=1, page=10) => {
    const searchUrl = `${backend_host}/bookings/filters`;
    console.log("request bookings", searchUrl);
    
    const bookings = [{}];

    return bookings;
}

const loadMoreBookingRequestsBtn = (page=1, limit=10) => {
    document.getElementById("see-more").innerHTML = `<button class="purple btn" onclick="compViewFunc(${page}, ${limit});">Ver Mais</button>`;
}

const createBookingCard = booking => {
    const options = {
        true: `<h5 class="white-text">Aprovado</h5>`,
        false: `<h5 class="white-text">Booking não aprovado</h5>`,
        undefined: `<a href="" class="btn purple">Aprovar</a>
                    <a href="" class="btn purple">Recusar</a>`
    }
    const card = `<div class="card purple darken-3">
                <div class="card-content white-text center">
                    <p>Agendamento no escritório nome escritorio no dia dia de mes</p>
                </div>
                <div class="card-content white-text purple darken-2 white-text">
                    <div id="user">
                        <h5 class="center white-text">Username</h5>
                        <div>description description description
                            description description description
                            description description description
                            description description description
                            description description description
                            description description description
                            description description description
                            description description description

                            description description description

                            description description description
                            description description description
                        </div>
                        <ul>
                            <li>Email: </li>
                        </ul>
                    </div>
                    <div id="status" class="center">
                        ${setStatus(booking, options)}
                    </div>
                </div>
            </div>`;
    document.getElementById("booking-requests").innerHTML += card;
}

const setStatus = (booking, options) => options[booking["booking_status"]]