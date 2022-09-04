const radioFilters = ["city", "address", "state"];

const searchPlaces = (page=1, limit=10) => {
    const selectedFilter = document.querySelector('input[name="filter"]:checked');

    if (selectedFilter && radioFilters.includes(selectedFilter.value)) {
        const searchBox = document.getElementById("search").value;
        const searchUrl = `${backend_host}/places/?${selectedFilter.value}=${searchBox}`;
        console.log(searchUrl)
        return
    }
    
    const searchUrl = `${backend_host}/places/`;
    const placesContainer = document.getElementById("places-container");
    placesContainer.innerText = "";
    listPlaces();
    listPlaces();
    listPlaces();
    addMoreBtn(page+1, limit);
    console.log(searchUrl)
}

const listPlaces = places => {
    const placesContainer = document.getElementById("places-container");
    const card = `<div class="col s12 m6 g4">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">Card Title</span>
                        <p>I am a very simple card. I am good at containing small bits of information.
                            I am convenient because I require little markup to use effectively.</p>
                    </div>
                    <div class="card-action purple ">
                        <a href="" class="white-text">Ver escritório</a>
                    </div>
                </div>
            </div>`;

    placesContainer.innerHTML += card
}

const addMoreBtn = (page=1, limit=10) => {
    document.getElementById("see-more").innerHTML = `<button class="purple btn" onclick="searchPlaces(${page}, ${limit});">Ver Mais</button>`;
}

const createPlacesPage = () => {
    const page = `
        <div class="section">
            <div class="header-search-wrapper search-box">
            <input class="header-search-input z-depth-2 search-input" type="text" id="search" name="Search" placeholder="Explore Escritórios" data-search="template-list">
            <button class="btn header-search-input z-depth-2 search-input search-btn purple lighten-1" onclick="searchPlaces();">Buscar</button>
        </div>
        <div class="container">
            <div class="row">
                <div class="col s4 m2 g2">
                    <p class="options-check purple darken-1 white-text z-depth-2">
                        <label>
                            <input name="filter" type="radio" value="state" class="white-text purple"/>
                            <span class="white-text">Estado</span>
                        </label>
                    </p>
                </div>
                <div class="col s4 m2 g2">
                    <p class="options-check purple darken-1 white-text z-depth-2">
                        <label>
                            <input name="filter" type="radio" value="address" class="white-text purple"/>
                            <span class="white-text">Endereço</span>
                        </label>
                    </p>
                </div>
                <div class="col s4 m2 g2">
                    <p class="options-check purple darken-1 white-text z-depth-2">
                        <label>
                            <input name="filter" type="radio" value="city" class="white-text purple"/>
                            <span class="white-text">Cidade</span>
                        </label>
                    </p>
                </div>
                <div class="col s4 m2 g2">
                    <p class="options-check darken-1 gray z-depth-2">
                        <label>
                            <input name="filter" type="radio" onclick="document.getElementById('search').value = '';" value="" checked class="black-text purple"/>
                            <span class="black-text">Limpar filtros</span>
                        </label>
                    </p>
                </div>
            </div>
        </div> 
        <div id="places-container" class="container row">
        </div>

        <div id="see-more" class="center">
        </div>
    `;

    document.getElementById("page-content").innerHTML = page;
}