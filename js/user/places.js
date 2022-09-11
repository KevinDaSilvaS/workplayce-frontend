const radioFilters = ["city", "address", "state"];

const searchPlaces = (page=1, limit=10, clear=false) => {
    const selectedFilter = document.querySelector('input[name="filter"]:checked');

    let searchUrl = `${backend_host}/places/?page=${page}&limit=${limit}`;
    if (selectedFilter && radioFilters.includes(selectedFilter.value)) {
        document.getElementById("places-container").innerHTML = "";
        const searchBox = document.getElementById("search").value;
        searchUrl = `${backend_host}/places/?${selectedFilter.value}=${searchBox}`;
    }

    if (clear) {
        document.getElementById("places-container").innerHTML = "";
    }
    
    request(searchUrl, {}, {}, "GET", places => {
            if (places["error"]) {
                listPlaces([]);
                addMoreBtn(page, limit);
            }
            listPlaces(places);
            addMoreBtn(page+1, limit+10);
            if (places.length <= 0) {
                addMoreBtn(page, limit);
            }
    }); 
}

const listPlaces = places => {
    const placesContainer = document.getElementById("places-container");
    if (places.length <= 0) {
        const noResultsFound = `<div class="col s12 m12 g12">0 escritórios encontrados.</div>`;
        placesContainer.innerHTML += noResultsFound;
        return;
    }
    
    places.map(place => {
        const {_id, address, city, country, description, company_id} = place;
        const searchUrl = `${backend_host}/companies/${company_id}`;
        request(searchUrl, {}, {}, "GET", (company) => {
            localStorage.setItem(`booking${_id}`, JSON.stringify({
                place_id: _id,
                company_id: company._id,
                company_name: company.company_name, 
                company_website: company.company_website, 
                place_description: description,
                company_email: company.email
            }))
            document.getElementById(`company${company_id}`).innerText = company.company_name;
        });

        const card = `<div class="col s12 m6 g4">
                <div class="card" id="${_id}">
                    <div class="card-content">
                        <span class="card-title" id="company${company_id}">oi</span>
                        <p>
                        ${description}
                        ${address}, ${city}, ${country}.
                        </p>
                    </div>
                    <div class="card-action purple">
                        <a onclick="redirect(window.location.pathname + '?page=book&place=${_id}')" class="white-text">Ver escritório</a>
                    </div>
                </div>
            </div>`;

        placesContainer.innerHTML += card;
    });
}

const addMoreBtn = (page=1, limit=10) => {
    document.getElementById("see-more").innerHTML = `<button class="purple btn" onclick="searchPlaces(${page}, ${limit});">Ver Mais</button>`;
}

const createPlacesPage = () => {
    const page = `
        <div class="section">
            <div class="header-search-wrapper search-box">
            <input class="header-search-input z-depth-2 search-input" type="text" id="search" name="Search" placeholder="Explore Escritórios" data-search="template-list">
            <button class="btn header-search-input z-depth-2 search-input search-btn purple lighten-1" onclick="searchPlaces(1, 10, true);">Buscar</button>
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
    searchPlaces();
}