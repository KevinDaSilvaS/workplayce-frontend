const createBookingsRequestPage = () => {
    console.log("bookings")
    const page = `<div class="container" id="booking-requests"></div>
                    <div id="see-more" class="center"></div>`;

    document.getElementById("page-content").innerHTML = page;
    loadBookingsRequests();
}

const loadBookingsRequests = (limit=1, page=10) => {
    const searchUrl = `${backend_host}/bookings/filters`;
    console.log("request bookings", searchUrl);
    
    const bookings = [{}];

    bookings.map(booking => createBookingCard(booking));
    loadMoreBookingRequestsBtn();
}

const loadMoreBookingRequestsBtn = (page=1, limit=10) => {
    document.getElementById("see-more").innerHTML = `<button class="purple btn" onclick="loadBookingsRequests(${page}, ${limit});">Ver Mais</button>`;
}

const createBookingCard = booking => {
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
                        ${setStatus(booking)}
                    </div>
                </div>
            </div>`;
    document.getElementById("booking-requests").innerHTML += card;
}

const setStatus = booking => {
    if (booking["booking_status"] == true) {
        return `<h5 class="white-text">Aprovado</h5>`;
    }

    if (booking["booking_status"] == false) {
        return `<h5 class="white-text">Booking não aprovado</h5>`;
    }

    return `<a href="" class="btn purple">Aprovar</a>
            <a href="" class="btn purple">Recusar</a>`;
}