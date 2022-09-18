const createAddAvailabilityPage = () => {
    const place_id = new URLSearchParams(window.location.search).get("place_id");
    coreAvailabilityPage(place_id);
    //createBookingCalendar(availableDays);
}

const checkAvailability = async place_id => {
    const currentDate = new Date();
    const month = currentDate.getMonth()+1;
    const searchUrl = `${backend_host}/places/availability/${month}/${place_id}`;
    const availability = await request(searchUrl, {}, {}, "GET", availability => availability)
    if (availability["error"] == 'Availability resource not found') {
        return false;
    }

    return true
}

const addAvailability = async place_id => {
    const currentDate = new Date();
    const month_number = currentDate.getMonth()+1;
    const token_id = getProperty("token_id");
    const url = `${backend_host}/places/availability/`;
    const available_spots = parseInt(document.getElementById('spots').value) || 1;
    const days_available = Object.values(JSON.parse(getFromLocalStorage("availability-days"))) || [];
    const requestData = {
        place_id,
        available_spots,
        days_available,
        month_number
    };
    // save availability
    const availability = await request(url, requestData, { "auth-token": token_id }, "POST", availability => availability)
    if (availability["error"]) {
        return error(availability["error"]);
    }

    localStorage.removeItem("availability-days");
    return redirect(window.location.pathname + "?page=places");
}

const coreAvailabilityPage = place_id => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth()+1;
    const page = `
        <div id="add-bookings-page">
            <div id="calendar" class="row">
                <div class="card">
                    <div id="day-names" class="col s12 m12 g12 purple z-depth-3">
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
                                    
                    <div id="day-values" class="col s12 m12 g12 purple lighten-1 z-depth-3">
                                       
                    </div>

                    <div class="col s12 m12 g12 z-depth-3">
                        <div class="card purple white-text">
                            <div class="card-content purple white-text">
                                <span class="card-title">Confirmar Disponibilidade</span>
                                <div class="col s9 m4 g4">
                                <p>Quantas vagas disponiveis há nesse escritório?</p>
                                </div>
                                <div class="col s3 m8 g8">
                                    <input type="number" class="input center white-text" id="spots" placeholder="vagas">
                                </div>
                                <p>Confirmar disponibilidade para ${months[month+1]} de ${year}?</p>
                                <p>Dias selecionados: <div id="days">...</div></p>
                                <button class="btn purple lighten-1" onclick="addAvailability('${place_id}')">Sim</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    document.getElementById("page-content").innerHTML = page;
    createAvailabilityCalendar(month, year);
}

const createAvailabilityCalendar = (year, month) => {
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
        const element = `
            <div class="col s1 m1 g1 day-num" id="${i}" onclick="addAvailableDay(${i})">
                <p class="white-text center">${i}</p>
            </div>`;

        dayValues.innerHTML += element;
    }
}

const addAvailableDay = day => {
    const dayElemClasses = document.getElementById(`${day}`).classList
    const availabilityDays = JSON.parse(getFromLocalStorage("availability-days")) || {}
    if (dayElemClasses.contains("available")) {
        dayElemClasses.remove("available");
        delete availabilityDays[day];

    } else {
        dayElemClasses.add("available");
        availabilityDays[day] = day;
    }
    
    localStorage.setItem("availability-days", JSON.stringify(availabilityDays));

    document.getElementById("days").innerHTML = Object.keys(availabilityDays).concat();
}

/* const addAvailableSpots = day => {
    const spots = parseInt(document.getElementById(`input${day}`).value) || 1;
    const availabilityDays = JSON.parse(getFromLocalStorage("availability-days")) || {}

    availabilityDays[day] = spots;
    localStorage.setItem("availability-days", JSON.stringify(availabilityDays))
    console.log(availabilityDays)
} */