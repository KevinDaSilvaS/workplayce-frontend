const createAddBookingsPage = () => {
    const searchUrl = `${backend_host}/bookings/`;
    const availableDays = [1, 5, 25, 30];
    corePage(123);
    createBookingCalendar(availableDays);
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
                </div>
            </div>
        </div>`;
    document.getElementById("page-content").innerHTML = page;
}

const isAvailable = (availableDays, day) => availableDays.includes(day);

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
                <div class="col s1 m1 g1 day-num available" id="${i}" onclick="addBooking(${i})">
                    <p class="white-text center">${i}</p>
                </div>`;
        }


        dayValues.innerHTML += element;
    }
}