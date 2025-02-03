const searchInput = document.getElementById('search-input');
const resultArtists = document.getElementById('result-artists');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
        .catch((error) => console.error("Erro na requisição:", error));
}

function displayResults(result) {
    resultPlaylist.classList.add('hidden');
    
    // Verifica se há artistas retornados
    if (result.length === 0) {
        resultArtists.innerHTML = "<p>Nenhum artista encontrado.</p>";
        resultArtists.classList.remove('hidden');
        return;
    }

    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultArtists.classList.remove('hidden');
}

searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtists.classList.remove('hidden');
        return;
    }

    requestApi(searchTerm);
});
