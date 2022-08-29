const userPages = {
    bookings: {
        title: "Bookings",
        link: "base-page.html?page=bookings",
        icon: "bookmarks"
    },
    places: {
        title: "Escritórios",
        link: "base-page.html?page=places",
        icon: "bookmarks"
    }
};

const companyPages = {
    places: {
        title: "Meus Escritórios",
        link: "base-page.html?page=places",
        icon: "bookmarks"
    },
    bookings: {
        title: "Solicitações de Bookings",
        link: "base-page.html?page=bookings",
        icon: "bookmarks"
    }
};

const pages = {
    "USER": userPages,
    "COMPANY": companyPages
}

const setMenuItens = () => {
    const user_type = getProperty("user_type");
    const menuPages = pages[user_type];
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