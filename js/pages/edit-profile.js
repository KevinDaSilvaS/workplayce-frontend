const formFields = {
    COMPANY: {
        fields: [
            {
                input_name: "company_name",
                input_title: "Nome da Empresa",
                input_type: "text"
            },
            {
                input_name: "company_website",
                input_title: "Site da Empresa",
                input_type: "text"
            },
            {
                input_name: "password",
                input_title: "Senha",
                input_type: "password"
            }
        ]
    },
    USER: {
        fields: [
            {
                input_name: "username",
                input_title: "Nome de Usuario",
                input_type: "text"
            },
            {
                input_name: "description",
                input_title: "Descrição do perfil",
                input_type: "textarea"
            },
            {
                input_name: "password",
                input_title: "Senha",
                input_type: "password"
            }
        ]
    }
};

const createInputs = {
    text: (id, title, currentValue="") => `
        <input id="${id}" type="text" value="${currentValue}">
        <label for="${id}" class="active">${title}</label>`,
    password: (id, title, currentValue="") => `
        <input id="${id}" type="password" value="${currentValue}">
        <label for="${id}" class="active">${title}</label>`,
    textarea: (id, title, currentValue="") => `
        <textarea name="${id}" id="${id}" cols="30" rows="20" style="height: 114px; width: 100%;">${currentValue}</textarea>
        <label for="${id}" class="active">${title}</label>`
}

const getUserData = user_type => {
    const url = ""
    return {
        username: "kevin da silva",
        password: "123",
        description: "oi"
    }
} 

const createEditProfilePage = () => {
    const user_type = getProperty("user_type");

    const inputs = formFields[user_type] || {fields: []};

    const page = `<div class="row card col s12 m12">
        <div class="col s12">
            <div class="row" id="fields">

            </div>
            <div class="row">
                <div class="input-field col s12">
                    <button onclick="saveProfileInfo(${user_type})" class="purple btn white-text">Salvar</button>
                </div>
            </div>
            <div class="row" id="error">
                
            </div>
        </div>
    </div>`;
    document.getElementById("page-content").innerHTML = page;

    const fieldsDiv = document.getElementById("fields");

    inputs.fields.map(({input_type, input_name, input_title}) => {
        const inputHtml = createInputs[input_type](input_name, input_title, getUserData(user_type)[input_name]);
        fieldsDiv.innerHTML += `
            <div class="input-field col s12">
            ${inputHtml}
            </div>`;
    });
}

const saveProfileInfo = user_type => {
    alert('saved');
}