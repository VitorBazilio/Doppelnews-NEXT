document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.getElementById('toggleThemeButton');
    var body = document.body;

    function getIcon(theme) {
        if (theme === 'black') {
            return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        }
        return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    }

    function setTheme(theme) {
        if (theme === 'black') {
            body.classList.add('theme-black');
            toggleButton.innerHTML = getIcon('black');
            toggleButton.setAttribute('aria-label', 'Alternar para tema claro');
        } else {
            body.classList.remove('theme-black');
            toggleButton.innerHTML = getIcon('white');
            toggleButton.setAttribute('aria-label', 'Alternar para tema escuro');
        }
        localStorage.setItem('siteTheme', theme);
    }

    function loadTheme() {
        var savedTheme = localStorage.getItem('siteTheme');
        if (savedTheme === 'black') {
            setTheme('black');
        } else {
            setTheme('white');
        }
    }

    if (!toggleButton) {
        return;
    }

    toggleButton.addEventListener('click', function () {
        var isBlack = body.classList.contains('theme-black');
        setTheme(isBlack ? 'white' : 'black');
    });

    loadTheme();
});
