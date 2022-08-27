const formType = new URLSearchParams(window.location.search).get("form");

const urls = {
    login_company: "http://localhost:4000/api/companies/auth/login",
    login_user: "http://localhost:4000/api/users/auth/login",
    signup_company: "http://localhost:4000/api/companies/",
    signup_user: "http://localhost:4000/api/users/"
};

const loginForm = `
<div>
    <input type="email" id="email" class="white-text input-field flow-text" placeholder="email">
    <input type="password" id="password" class="white-text input-field flow-text" placeholder="senha">
    <button onclick="submitLoginForm();" class="btn purple">Entrar</button>
</div>
`;

const createCompanyForm = `
<div>
    <input type="text" id="company_name" class="white-text input-field flow-text" placeholder="nome da empresa">
    <input type="text" id="company_website" class="white-text input-field flow-text" placeholder="site da empresa">
    <input type="email" id="email" class="white-text input-field flow-text" placeholder="email">
    <input type="password" id="password" class="white-text input-field flow-text" placeholder="senha">
    <button onclick="submitCompanyForm();" class="btn purple">Entrar</button>
</div>
`;

const createUserForm = `
<div>
    <input type="text" id="username" class="white-text input-field flow-text" placeholder="nome de usuario">
    <label for="description" class="left">descrição: use esse espaço para falarmais sobre voce, colocar seu linkedin e mostrar mais sobre quem voce é</label>
    <textarea id="description" name="description" class="white-text input-field flow-text"></textarea>
    <input type="email" id="email" class="white-text input-field flow-text" placeholder="email">
    <input type="password" id="password" class="white-text input-field flow-text" placeholder="senha">
    <button onclick="submitUserForm();" class="btn purple">Entrar</button>
</div>
`;

const forms = {
    login_company: [loginForm, "Login Empresa"],
    login_user: [loginForm, "Login Usuario"],
    signup_company: [createCompanyForm, "Inscrever Empresa"],
    signup_user: [createUserForm, "Cadastrar Usuario"]
};

const setForm = () => {
    const [form, title] = forms[formType];
    document.title = title;
    document.getElementById("form").innerHTML = form;
};

const submitLoginForm = () => {
    const email = document.getElementById("email").value; 
    const password = document.getElementById("password").value;
    
    request(
        urls[formType], 
        {
            email,
            password
        }, 
        {}, 
        "POST", 
        authResult => {
            if (authResult["error"])
                return error(authResult.error);
            const expiration = new Date();
            expiration.setDate(expiration.getDate() + 3);
            localStorage.setItem("token_id", authResult.token_id);
            document.cookie = `token_id=${token_id}; expires=${expiration}`;
        });
};

const submitCompanyForm = () => {
    const email = document.getElementById("email").value; 
    const password = document.getElementById("password").value;
    const companyName = document.getElementById("company_name").value; 
    const website = document.getElementById("company_website").value; 
    request(
        urls[formType], 
        {
            companyName,
            website,
            email,
            password
        }, 
        {}, 
        "POST", 
        user => console.log(user));
};

const submitUserForm = () => {
    const username = document.getElementById("username").value;
    const description = document.getElementById("description").value; 
    const email = document.getElementById("email").value; 
    const password = document.getElementById("password").value; 
    
    request(
        urls[formType], 
        {
            username,
            description,
            email,
            password
        }, 
        {}, 
        "POST", 
        user => console.log(user));
};

setForm();