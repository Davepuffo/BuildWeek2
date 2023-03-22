const ARTISTA_URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/"
const artistaId = new URLSearchParams(window.location.search).get("id")

const inserisciTitolo = function (artist) {
    let prendiTesto = document.getElementById('titoloArtista')
    prendiTesto.innerHTML = `<p>
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="blue"
        class="bi bi-patch-check-fill" viewBox="0 0 16 16">
        <path
            d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
    </svg>
    Artista verificato
</p>
<h1>${artist.name}</h1>
<p>${artist.nb_fan} ascoltatori mensili</p>`
}

const inserisciCanzoni = function (canzone) {
    let prendiCanzoni = document.getElementById('listaCanzoni')
    canzone.forEach(element => {
        let newSong = document.createElement('li');
        newSong.innerHTML = `
        <button class="w-100 bg-dark text-white border border-0">
        <div class="row align-items-center my-2">
            <div class="col-2 d-flex justify-content-center">
                <img src="${element.album.cover_small}"
                    alt="" height="40px" />
            </div>
            <div
                class="col-8 text-start d-flex justify-content-between align-items-center">
                <p class="m-0">${element.title}</p>
                <p class="m-0">${element.rank}</p>
            </div>
            <div class="col-2 text-end">${element.duration}</div>
        </div>
    </button>
        `;
        prendiCanzoni.appendChild(newSong)
    });
}

fetch(ARTISTA_URL + artistaId)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        inserisciTitolo(data)
    })
    .catch((err) => {
        console.log(err)
    })

fetch(ARTISTA_URL + artistaId)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        const tracklist_url = data.tracklist
        fetch(tracklist_url)
            .then((response2) => {
                return response2.json()
            })
            .then((data2) => {
                console.log(data2.data)
                return data2.data
            })
            .then((song) => {
                inserisciCanzoni(song)
            })
    })
    .catch((err) => {
        console.log(err)
    })
