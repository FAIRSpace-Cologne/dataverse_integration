/* Theme toggle — sync <html> (set early in <head> to avoid flash) with <body> on load */
if (document.documentElement.classList.contains('dark-mode')) {
    document.body.classList.add('dark-mode');
}
var themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', function () {
    var isDark = document.body.classList.toggle('dark-mode');
    document.documentElement.classList.toggle('dark-mode', isDark);
    sessionStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* Dataverse search — filters the dataset/dataverse cards already on the page */
var dvSearchGroups = [
    { container: document.querySelector('#latest-dataverses .dv-recent-list'), itemSelector: '.dv-recent-item' },
    { container: document.querySelector('#popular-datasets .dv-card-grid'), itemSelector: '.dv-ds-card' },
    { container: document.querySelector('#latest-datasets .dv-recent-list'), itemSelector: '.dv-recent-item' }
];

function dvSearch() {
    var query = document.getElementById('dvSearchInput').value.trim().toLowerCase();
    var firstMatch = null;

    dvSearchGroups.forEach(function (group) {
        if (!group.container) return;
        var items = group.container.querySelectorAll(group.itemSelector);
        var anyVisible = false;

        items.forEach(function (item) {
            var matches = query === '' || item.textContent.toLowerCase().indexOf(query) !== -1;
            item.style.display = matches ? '' : 'none';
            if (matches) {
                anyVisible = true;
                if (!firstMatch) firstMatch = item;
            }
        });

        var noResults = group.container.parentElement.querySelector('.dv-no-results');
        if (noResults) noResults.style.display = anyVisible ? 'none' : 'block';
    });

    if (query !== '' && firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (query !== '') {
        var fallback = document.getElementById('latest-datasets');
        if (fallback) fallback.scrollIntoView({ behavior: 'smooth' });
    }
}
