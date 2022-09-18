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

let editProfileUserData = {};

const createInputs = {
    text: (id, title, currentValue="") => `
        <input id="${id}" type="text" value="${currentValue}">
        <label for="${id}" class="active">${title}</label>`,
    password: (id, title, currentValue="") => `
        <input id="${id}" type="password" value="">
        <label for="${id}" class="active">${title}</label>`,
    textarea: (id, title, currentValue="") => `
        <textarea name="${id}" id="${id}" cols="30" rows="20" style="height: 114px; width: 100%;">${currentValue}</textarea>
        <label for="${id}" class="active">${title}</label>`
}

const getEditProfileUrl = (user_type) => {
    const user_id = getProperty("user_id");
    if (user_type == "USER") {
        return `${backend_host}/users/${user_id}`;
    }
    return `${backend_host}/companies/${user_id}`;
}

const getUserData = async user_type => {
    const url = await getEditProfileUrl(user_type);
    const userData = await request(url, {}, {}, "GET", result => result)
    if (userData["error"]) {
        return {};
    }

    return userData;
} 

const createEditProfilePage = async () => {
    const user_type = getProperty("user_type");

    const inputs = formFields[user_type] || {fields: []};

    const page = `<div class="row card col s12 m12">
        <div class="col s12">
            <div class="row" id="fields">

            </div>
            <div class="row">
                <div class="input-field col s12">
                    <button onclick="saveProfileInfo('${user_type}')" class="purple btn white-text">Salvar</button>
                </div>
            </div>
            <div class="row" id="error">
                
            </div>
        </div>
    </div>`;
    document.getElementById("page-content").innerHTML = page;

    const fieldsDiv = document.getElementById("fields");

    editProfileUserData = await getUserData(user_type);
    inputs.fields.map(async ({input_type, input_name, input_title}) => {
        const inputHtml = createInputs[input_type](input_name, input_title, editProfileUserData[input_name]);
        fieldsDiv.innerHTML += `
            <div class="input-field col s12">
            ${inputHtml}
            </div>`;
    });
}

const saveProfileInfo = async user_type => {
    const url = await getEditProfileUrl(user_type);
    const requestData = formFields[user_type].fields.reduce((acc, input) => {
        const inputName = input["input_name"];
        const inputField = document.getElementById(`${inputName}`).value;
        if (inputField == "" || editProfileUserData[inputName] == inputField) {
            return acc;
        }
        acc[inputName] = inputField;
        return acc;
    }, {});

    if (Object.keys(requestData).length <= 0) {
        return
    }
    
    const updatedProfile = await request(url, requestData, {
        "auth-token": getProperty("token_id")
    }, "PATCH", result => result);

    if (updatedProfile["error"]) {
        error(updatedProfile["error"]);
        return
    } else {
        redirect(window.location.href);
    }
    
}