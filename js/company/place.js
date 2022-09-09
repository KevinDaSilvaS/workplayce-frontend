const createPlacesForm = () => {
    const page = `<div class="row card col s12 m12">
                    <div class="col s12">
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="address" type="text" class="validate">
                                <label for="address">Endereço</label>
                            </div>
                            <div class="input-field col s3">
                                <input id="city" type="text" class="validate">
                                <label for="city">Cidade</label>
                            </div>
                            <div class="input-field col s3">
                                <input id="country" type="text" class="validate">
                                <label for="country">País</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <textarea name="description" id="description" cols="30" rows="20" style="height: 114px; width: 100%;">uma breve descrição</textarea>
                                <label for="description" class="active">Descrição - adicione uma descrição do espaço</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <textarea name="links" id="links" cols="30" rows="20" style="height: 114px; width: 100%;">link1.com,link2.com</textarea>
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

const savePlace = () => {
    alert("salvo");
}