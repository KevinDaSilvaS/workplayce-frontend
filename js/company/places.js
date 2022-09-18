const createViewPlacesPage = async () => {
    const user_id = getProperty("user_id")
    const searchUrl = `${backend_host}/places/companies/${user_id}`;
    const places = await request(searchUrl, {}, {}, "GET", async places => places);
    if (places["error"]) {
       error(places["error"])
    }

    const page = `<div id="company-places-view" class="container">
                    <div class="row">
                        <br>
                        <div class="col s10 m10 g10">
                            <h5>Meus escritórios</h5>
                        </div>
                        <div class="col s2 m2 g2">
                            ${await addPlaceBtn(places.length)}
                        </div>
                    </div>

                    <div class="row" id="my-places">
                        
                    </div>
                </div>
                <div id="see-more" class="center"></div>`;

    document.getElementById("page-content").innerHTML = page;
    places.map(loadPlacesCards);
}

const addPlaceBtn = (totalPlaces, maxOffices = 1) => {
    if (totalPlaces < maxOffices) {
        return `<button class="btn purple tooltipped" onclick="addPlace()" data-position="bottom" data-tooltip="Adicionar escritório"><i class="material-icons">add</i></button>`;
    }
    return "";
};

const addPlace = () => redirect(window.location.pathname + '?page=add_place')

const addAvailabilityBtn = async place_id => {
    const hasAvailability = await checkAvailability(place_id);
    if (!hasAvailability) {
        return `<a class="btn tooltipped green darken-1" href="base-page.html?page=add_availability&place_id=123" data-position="bottom" data-tooltip="Adicionar disponibilidade"><i class="material-icons">event</i></a>`;
    }
    return "";
}

const loadPlacesCards = async place => {
    const placeStringified = JSON.stringify(place);
    localStorage.setItem(place._id, placeStringified);
    const placeCard = `<div class="col s12 m5">
                            <div class="card">
                                <div class="card-image">
                                <img src="../img/icons/512x512.PNG" width="50px" height="400px">
                                <span class="card-title black-text">${place.address}, ${place.city}, ${place.country}</span>
                                </div>
                                <div class="card-content">
                                <p>${place.description}</p>
                                <br>
                                <a class="btn tooltipped purple" data-position="bottom" href="base-page.html?page=edit_place&place_id=${place._id}" data-tooltip="Editar escritório"><i class="material-icons">edit</i></a>
                                <a class="btn tooltipped red darken-1 modal-trigger" data-position="bottom" data-tooltip="Deletar escritório" onclick="deletePlace('${place._id}');"><i class="material-icons">delete</i></a>
                                ${await addAvailabilityBtn(place._id)}
                                </div>
                            </div>
                        </div>`;
    document.getElementById("my-places").innerHTML += placeCard;
}

const deletePlace = async place_id => {
    const token_id = getProperty("token_id");
    const url = `${backend_host}/places/${place_id}`;
    const result = await request(url, {}, { "auth-token": token_id }, "DELETE", result => result)
    if (result["error"]) {
        return false;
    }
    redirect(window.location.href);
}