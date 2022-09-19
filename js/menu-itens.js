const userPages = {
    bookings: {
        title: "Bookings",
        link: "base-page.html?page=bookings",
        icon: "bookmarks"
    },
    places: {
        title: "Escritórios",
        link: "base-page.html?page=places",
        icon: "business"
    },
    sair: {
        title: "Sair",
        link: "../index.html?logout=true",
        icon: "directions_run"
    }
};

const companyPages = {
    places: {
        title: "Meus Escritórios",
        link: "base-page.html?page=places",
        icon: "business"
    },
    bookings: {
        title: "Solicitações de Bookings",
        link: "base-page.html?page=bookings",
        icon: "bookmarks"
    },
    sair: {
        title: "Sair",
        link: "../index.html?logout=true",
        icon: "directions_run"
    }
};

const pages = {
    "USER": userPages,
    "COMPANY": companyPages
}

const setMenuItens = () => {
    const user_type = getProperty("user_type");
    const menuPages = pages[user_type] || [];
    const menuItensKeys = Object.keys(menuPages); 

    const menuElement = document.getElementById("menu")
    menuElement.innerHTML = ""

    menuItensKeys.map(page => {
        const {title, link, icon} = menuPages[page];
        const elem = `<li class="bold" id="${page}"><a class="waves-effect waves-cyan" href="${link}"><i class="material-icons">${icon}</i><span class="menu-title">${title}</span></a>
        </li>`

        menuElement.innerHTML += elem
    })
    
};