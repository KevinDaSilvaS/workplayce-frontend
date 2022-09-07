const hasAvailability = checkAvailability("place_id");

const createViewPlacesPage = () => {
    const myPlaces = loadPlacesRequests();
    const page = `<div id="company-places-view" class="container">
                    <div class="row">
                        <br>
                        <div class="col s10 m10 g10">
                            <h5>Meus escritórios</h5>
                        </div>
                        <div class="col s2 m2 g2">
                            ${addPlaceBtn(myPlaces)}
                        </div>
                    </div>

                    <div class="row" id="my-places">
                        
                    </div>
                </div>
                <div id="see-more" class="center"></div>`;

    document.getElementById("page-content").innerHTML = page;
    myPlaces.map(loadPlacesCards);
}

const loadPlacesRequests = (limit=1, page=10) => {
    const searchUrl = `${backend_host}/places/filters`;
    console.log("request places", searchUrl);
    
    const places = [{}];
    return places;
};

const addPlaceBtn = (places, maxOffices=1) => {
    if (places.length < maxOffices) {
        return `<button class="btn purple tooltipped" data-position="bottom" data-tooltip="Adicionar escritório"><i class="material-icons">add</i></button>`;
    }
    return "";
};

const addAvailabilityBtn = () => {
    if (!hasAvailability) {
        return `<a class="btn tooltipped green darken-1" href="base-page.html?page=add_availability&place_id=123" data-position="bottom" data-tooltip="Adicionar disponibilidade"><i class="material-icons">event</i></a>`;
    }
    return "";
}

const loadPlacesCards = place => {
    const placeCard = `<div class="col s12 m5">
                            <div class="card">
                                <div class="card-image">
                                <img src="../img/icons/512x512.PNG" width="50px" height="400px">
                                <span class="card-title black-text">Endereço</span>
                                </div>
                                <div class="card-content">
                                <p>Descrição do escritório.
                                    Descrição do escritório.
                                    Descrição do escritório.
                                    Descrição do escritório.
                                    Descrição do escritório.
                                </p>
                                <br>
                                <button class="btn tooltipped purple" data-position="bottom" data-tooltip="Editar escritório"><i class="material-icons">edit</i></button>
                                <button class="btn tooltipped red darken-1" data-position="bottom" data-tooltip="Deletar escritório"><i class="material-icons">delete</i></button>
                                ${addAvailabilityBtn()}
                                </div>
                            </div>
                        </div>`;
    document.getElementById("my-places").innerHTML += placeCard;
}