const hyperlink = (e) => {
    if (e.dataset && e.dataset.url) {
        const toggleMenuBtn = document.getElementById('toggle-menu-btn');
        toggleMenuBtn.click();
        document.location = e.dataset.url;
    }
};

const toggleMenu = (e) => {
    const navContainerElem = document.getElementById('nav-container');
    const classList = navContainerElem.classList;

    if (classList.contains('nav-container--expand')) {
        // do collapse
        classList.remove('nav-container--expand');
        classList.add('nav-container--collapse');
    }
    else {
        // do expand
        classList.remove('nav-container--collapse');
        classList.add('nav-container--expand');
    }
    
    // navContainerElem.classList.toggle('nav-container--expand');
};