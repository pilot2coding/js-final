async function fetchData() {
    try {
        const response = await fetch('travel_recommendation.json');
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function handleSearch(event) {
    event.preventDefault();

    const data = await fetchData();
    if (!data) {
        document.getElementById('result').innerText = 'No results found';
        return;
    }

    const searchQuery = document.getElementById('destinationInput').value.toLowerCase();
    let results = '';

    if (searchQuery == 'temples' || searchQuery == 'temple') {
        data.temples.forEach(temple => {
            results += `<div><h3>${temple.name}</h3><p>${temple.description}</p><img src="${temple.imageUrl}" alt="${temple.name}"></div>`;
        });
    } else if (searchQuery == 'beaches' || searchQuery == 'beach') {
        data.beaches.forEach(beach => {
            results += `<div><h3>${beach.name}</h3><p>${beach.description}</p><img src="${beach.imageUrl}" alt="${beach.name}"></div>`;
        });
    } else {
        // Búsqueda general en países
        data.countries.forEach(country => {
            if (country.name.toLowerCase().includes(searchQuery)) {
                country.cities.forEach(city => {
                    results += `<div><h3>${city.name}</h3><p>${city.description}</p><img src="${city.imageUrl}" alt="${city.name}"></div>`;
                });
            }
        });
    }

    document.getElementById('result').innerHTML = results;
}

function clearResults() {
    document.getElementById('destinationInput').value = '';
    document.getElementById('result').innerHTML = '';
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btnSearch').addEventListener('click', handleSearch);
    document.getElementById('btnClear').addEventListener('click', clearResults);
});
