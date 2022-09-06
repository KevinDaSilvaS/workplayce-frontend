const createAddBookingsPage = () => {
    const searchUrl = `${backend_host}/bookings/`;
    const availableDays = [1, 5, 25, 30];
    corePage(123);
    createBookingCalendar(availableDays);
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

const corePage = place_id => {
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
                                <span class="card-title">Card Title</span>
                                <p>I am a very simple card. I am good at containing small bits of information.
                                    I am convenient because I require little markup to use effectively.</p>
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

const showConfirmationBooking = day => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth()+1;
    const confirmBox = `
    <div class="col s12 m12 g12 z-depth-3">
        <div class="card purple white-text">
            <div class="card-content purple white-text">
                <span class="card-title">Confirmar Booking</span>
                <p>Solicitar escritório para o dia ${day} de ${months[month]} de ${year}?</p>
                <button class="btn purple lighten-1" onclick="addBooking(${day})">Sim</button>
            </div>
        </div>
    </div>`;
    document.getElementById('confirm-box').innerHTML = confirmBox;
}

const addBooking = day => alert(`booking ${day}`);

const createBookingCalendar = availableDays => {
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
                <div class="col s1 m1 g1 day-num available" id="${i}" onclick="showConfirmationBooking(${i})">
                    <p class="white-text center">${i}</p>
                </div>`;
        }


        dayValues.innerHTML += element;
    }
}