const createAddBookingsPage = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth()+1;
    const place_id = new URLSearchParams(window.location.search).get("place");
    const apiUrl = `${backend_host}/places/availability/${month}/${place_id}`;
    
    const aboutCompanyAndOfficeCard = JSON.parse(getProperty(`booking${place_id}`));
    const companyId = aboutCompanyAndOfficeCard["company_id"];
    corePage(aboutCompanyAndOfficeCard);
    request(apiUrl, {}, {}, "GET", availability => {
        if (availability["error"]) {
            return createBookingCalendar([], companyId);
        }

        localStorage.setItem("availability_id", availability["_id"])
        const availableDays = availability["days_available"];
        createBookingCalendar(availableDays, companyId);
    });
}

const months = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
}

const corePage = cardData => {
    const page = `
        <div id="add-bookings-page">
            <div id="calendar" class="row">
                <div class="card">
                    <div id="day-names" class="col s11 m7 g7 purple z-depth-3">
                        <div class="col s1 m1 g1 day">
                            <p class="white-text center">dom</p>
                        </div>
            
                        <div class="col s1 m1 g1 day">
                            <p class="white-text center">seg</p>
                        </div>
                                        
                        <div class="col s1 m1 g1 day">
                            <p class="white-text center">ter</p>
                        </div>
            
                        <div class="col s1 m1 g1 day">
                            <p class="white-text center">qua</p>
                        </div>
            
                        <div class="col s1 m1 g1 day">
                            <p class="white-text center">qui</p>
                        </div>
            
                        <div class="col s1 m1 g1 day">
                            <p class="white-text center">sex</p>
                        </div>
            
                        <div class="col s1 m1 g1 day">
                            <p class="white-text center">sab</p>
                        </div>
                                        
                    </div>
                                    
                    <div id="day-values" class="col s11 m7 g7 purple lighten-1 z-depth-3">
                                       
                    </div>

                    <div class="col s12 m5 g5 z-depth-3">
                        <div class="card">
                            <div class="card-content">
                                <span class="card-title">${cardData["company_name"]} - ${cardData["company_website"]}</span>
                                <p>${cardData["place_description"]}.</p>
                                <p>Email para contato: ${cardData["company_email"]}.</p>
                            </div>
                        </div>
                    </div>
                    <div id="confirm-box"></div>
                </div>
            </div>
        </div>`;
    document.getElementById("page-content").innerHTML = page;
}

const isAvailable = (availableDays, day) => availableDays.includes(day);

const showConfirmationBooking = (day, companyId) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth()+1;
    const confirmBox = `
    <div class="col s12 m12 g12 z-depth-3">
        <div class="card purple white-text">
            <div class="card-content purple white-text">
                <span class="card-title">Confirmar Booking</span>
                <p>Solicitar escritório para o dia ${day} de ${months[month]} de ${year}?</p>
                <button class="btn purple lighten-1" onclick="addBooking(${day}, '${companyId}')">Sim</button>
            </div>
        </div>
    </div>`;
    document.getElementById('confirm-box').innerHTML = confirmBox;
}

const addBooking = (day, company_id) => {
    const currentDate = new Date();
    const month = currentDate.getMonth()+1;
    const apiUrl = `${backend_host}/bookings`;
    const place_id = new URLSearchParams(window.location.search).get("place");
    const requestBody = {
      user_id: getProperty("user_id"),
      place_id,
	  availability_id: getProperty("availability_id"),
      company_id,
      day,
      month
    }

    request(apiUrl, requestBody, {
        "auth-token": getProperty("token_id")
    }, "POST", booking => {
        if (booking["error"]) {
            return alert("Erro ao cadastrar booking, por favor tente novamente");
        }

       redirect(window.location.pathname + "?page=bookings");
    });
};

const createBookingCalendar = (availableDays, companyId) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const currentMonth = new Date(year, month, 0);
    const maxDayMonth = currentMonth.getDate();
    const startDayMonth = currentMonth.getDay();
    const dayValues = document.getElementById('day-values');

    for (let i = 0; i <= startDayMonth; i++) {
        const element = `
            <div class="col s1 m1 g1 day-num">
                <p class="white-text center"></p>
            </div>`;
        dayValues.innerHTML += element;
    }

    for (let i = 1; i <= maxDayMonth; i++) {
        let element = `
                <div class="col s1 m1 g1 day-num" id="${i}">
                    <p class="white-text center">${i}</p>
                </div>`;

        if (isAvailable(availableDays, i)) {
            element = `
                <div class="col s1 m1 g1 day-num available" id="${i}" onclick="showConfirmationBooking(${i}, '${companyId}')">
                    <p class="white-text center">${i}</p>
                </div>`;
        }


        dayValues.innerHTML += element;
    }
}