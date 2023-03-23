const ARTISTA_URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/"
const artistaId = new URLSearchParams(window.location.search).get("id")
const prendiFooter = document.getElementById('playerFooter');
let music = '';

function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    const secondsString = seconds.toFixed(0).padStart(2, '0');
    return `${minutes}:${secondsString}`;
}

const inserisciTitolo = function (artist) {
    let prendiTesto = document.getElementById('titoloArtista')
    prendiTesto.style.backgroundImage = `url(${artist.picture})`;
    prendiTesto.innerHTML = `
    <p>
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="blue"
        class="bi bi-patch-check-fill" viewBox="0 0 16 16">
        <path
            d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
    </svg>
    Artista verificato
</p>
</div>
<h1 class="z-index-1">${artist.name}</h1>
<p>${artist.nb_fan} ascoltatori mensili</p>`
    let likeArtista = document.getElementById('likeArtista')
    likeArtista.innerHTML = `
    <div class="col-4 text-center">
    <img src="${artist.picture_medium}" alt="" height="80px" />
                                        </div>
                                        <div class="col-8">
                                            <p>Hai messo Mi piace a 11 brani a ${artist.name}</p>
                                        </div>`
}

const inserisciCanzoni = function (canzone) {
    let prendiCanzoni = document.getElementById('listaCanzoni')
    canzone.forEach(element => {
        let newSong = document.createElement('li');
        newSong.innerHTML = `
        <button onclick="playMusic(\'${element.preview}\')" class="canzonePlay w-100 bg-black text-white border border-0">
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
            <div class="col-2 text-end">${formatDuration(element.duration)}</div>
        </div>
    </button>
        `;
        prendiCanzoni.appendChild(newSong)
    })
}

function playMusic(x) {
    music = new Audio(x)
    music.play()
    let titolo1 = document.getElementById('titoloFooter1')
    titolo1.innerHTML = 'ciao'
}

const urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const riempiAlbum = function (album) {
    const prendiLista = document.getElementById('listaAlbum')
    for (i = 0; i < album.length && i < 6; i++) {
        let newAlbum = document.createElement('div');
        newAlbum.className += " col col-12 col-md-4 col-lg-3 col-xxl-2 d-flex justify-content-center  mb-2"
        newAlbum.innerHTML = `
        <div class="cardsHome  h-100">
                                <div class="item h-100">
                                <a href="./album_page.html?id=${album[i].album.id}" class="text-decoration-none text-light">
                                    <img src=${album[i].album.cover_medium} class=""/>
                                    <div class="play">
                                        <i class="bi bi-play-fill"></i>
                                    </div>
                                    <p>${album[i].album.title}</p></a>
                                </div>
                            </div>   
            `;
        prendiLista.appendChild(newAlbum);
    }
}

const albumArtista = function (album) {
    fetch(urlAlbum + `${album.name}`)
        .then((response3) => {
            return response3.json()
        })
        .then((data3) => {
            riempiAlbum(data3.data)
        })
        .catch((err) => {
            console.log(err)
        })
}


fetch(ARTISTA_URL + artistaId)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        inserisciTitolo(data)
        albumArtista(data)
    })
    .catch((err) => {
        console.log(err)
    })

const prendiBtn = document.getElementsByClassName('canzonePlay')


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
                return data2.data
            })
            .then((song) => {
                console.log(song)
                inserisciCanzoni(song)
            })
    })
    .catch((err) => {
        console.log(err)
    })