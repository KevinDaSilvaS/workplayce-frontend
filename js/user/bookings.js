createBookingsUserView = () => {
    const page = `<div id="booking-requests"><br></div>
                    <div id="see-more" class="center"></div>`;
    document.getElementById("page-content").innerHTML = page;
    userBookingsViewFunc();
}

const userBookingsViewFunc = (limit=10, page=1) => {
    const bookings = loadBookingsRequests(limit, page);
    proccessUserBookingRequestsView(bookings);
    loadMoreBookingRequestsUserBtn(limit+10, page+1);
}

const loadMoreBookingRequestsUserBtn = (page=1, limit=10) => {
    document.getElementById("see-more").innerHTML = `<br><button class="purple btn" onclick="userBookingsViewFunc(${page}, ${limit});">Ver Mais</button>`;
}

const proccessUserBookingRequestsView = bookings => bookings.map(createBookingUserRequestCard);

const createBookingUserRequestCard = booking => {
    const options = {
        true: `Aprovado`,
        false: `Booking não aprovado`,
        undefined: `Aguardando aprovação`
    }
    const card = `<hr class=""><div class="purple darken-3 row">
                    <div class="white-text center col s6 m6 g6">
                        <p>Agendamento no Endereço escritorio no dia dia de mes</p>
                    </div>
                    <div class="white-text center col s6 m6 g6 purple darken-2">
                        <div id="status" class="center">
                            <p>${setStatus(booking, options)}</p>
                        </div>
                    </div>
                </div>`;
    document.getElementById("booking-requests").innerHTML += card;
}

