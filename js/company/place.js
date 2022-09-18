const createPlacesForm = () => {
    const place_id = new URLSearchParams(window.location.search).get("place_id");
    let address = "";
    let city = "";
    let country = "";
    let description = "uma breve descrição";
    let links = "link1.com,link2.com";
    if (place_id) {
        placeData = JSON.parse(getProperty(place_id));
        address = placeData.address;
        city = placeData.city;
        country = placeData.country;
        description = placeData.description;
        links = placeData.links;
    }

    const page = `<div class="row card col s12 m12">
                    <div class="col s12">
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="address" type="text" class="validate" value="${address}">
                                <label for="address">Endereço</label>
                            </div>
                            <div class="input-field col s3">
                                <input id="city" type="text" class="validate" value="${city}">
                                <label for="city">Cidade</label>
                            </div>
                            <div class="input-field col s3">
                                <input id="country" type="text" class="validate" value="${country}">
                                <label for="country">País</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <textarea name="description" id="description" cols="30" rows="20" style="height: 114px; width: 100%;">${description}</textarea>
                                <label for="description" class="active">Descrição - adicione uma descrição do espaço</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <textarea name="links" id="links" cols="30" rows="20" style="height: 114px; width: 100%;">${links}</textarea>
                                <label for="links" class="active">Adicione links com imagens e detalhes do escritorio separados por virgula</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <button onclick="savePlace()" class="purple btn white-text">Salvar</button>
                            </div>
                        </div>
                        <div class="row" id="error">
                            
                        </div>
                    </div>
                </div>`;

    document.getElementById("page-content").innerHTML = page;
}

const savePlace = async () => {
    const place_id = new URLSearchParams(window.location.search).get("place_id");
    let method = "POST";
    let url = `${backend_host}/places/`;

    const company_id = getProperty("user_id");
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const country = document.getElementById("country").value;
    const description = document.getElementById("description").value
    const links = document.getElementById("links").value.split(",")
    const requestData = {
	    address,
		city,
		company_id,
		country,
		description,
		links,
		tags: []
    }

    if (place_id) {
        method = "PATCH";
        url += place_id
        delete requestData.company_id
    }
    
    const token_id = getProperty("token_id");
    const place = await request(url, requestData, {"auth-token": token_id}, method, result => result)
    if (place["error"]) {
        return error(place["error"]);
    }

    redirect(window.location.pathname + '?page=places')
}