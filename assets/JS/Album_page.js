const ALBUM_URL = ' https://striveschool-api.herokuapp.com/api/deezer/album/'
let albumId = new URLSearchParams(window.location.search).get('id')
console.log('Id', albumId)


const showAlbum = function (album) {
    let albumBody = document.getElementsByClassName('album__body')[0]
    console.log(albumBody)
    albumBody.innerHTML = `<div><img class="album__img shadow-lg img-fluid" src="${album.cover_medium}" alt="${album.title}">
</div>
<div class="ms-2 mt-3">
    <p class="album__album fw-bolder">Album</p>
    <h2 class=" album__name fw-bolder">${album.title}</h2>
    <div class="artist__info d-flex">
        <div class="d-flex">
            <img class="rounded-circle mx-1" src="${album.artist.picture_small}" alt="${album.artist.name}">
            <p>${album.artist.name}&nbsp&#183&nbsp</p>
            <p class="anno__ril">${album.release_date}&nbsp&#183&nbsp</p>
            <p class="nr__canzoni">${album.nb_tracks} songs, <span class="opacity-50 small">${Math.floor(album.duration / 60)}&nbspminutes</span>
            </p>
        </div>
        <p class="album__annoR d-sm-none">Album - <span>${album.release_date}</span></p>
    </div>
</div>`
}



const showSongs = function (songs) {
    let playList = document.getElementById('allSongs')
    songs.forEach(song => {
        let songElement = document.createElement('div')
        let songIndex = songs.indexOf(song) + 1
        playList.innerHTML += `<div class="col-7">
        <div class="artist__title d-flex align-items-center">
            <div>
                <p class="text-white opacity-75">${songIndex}</p>
            </div>
            <div class="d-flex flex-column ms-3">
                <p class="mb-1 text-white opacity-75">${song.artist.name}</p>
                <p class="text-white opacity-50">${song.title}</p>
            </div>
        </div>
    </div>
    <div class="col-3 text-white opacity-75">
        <p class="ripro__numb">${song.rank}</p>
    </div>
    <div class="col-2 text-white opacity-75">
        <p class="song__time">${Math.floor(song.duration / 60)}&nbspminutes</p>
    </div>`
        playList.appendChild(songElement)
    })
}

if (albumId) {
    fetch(ALBUM_URL + albumId)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return new Error('Error!')
            }
        })
        .then((album) => {
            console.log(album)
            showAlbum(album)
            let songs = album.tracks.data
            showSongs(songs)
        })
        .catch((err) => {
            console.log(err)
        })
}

//codice icona volume

const volumeBar = document.querySelector('.volume-bar');
const volumeInput = volumeBar.querySelector('input');
const volumeIcon = volumeBar.querySelector('i');


volumeInput.addEventListener('input', (event) => {
    const volume = parseInt(event.target.value, 10);
    volumeIcon.classList.remove('bi-volume-up', 'bi-volume-down', 'bi-volume-mute');
    if (volume === 0) {
        volumeIcon.classList.add('bi-volume-mute');
    } else if (volume < 50) {
        volumeIcon.classList.add('bi-volume-down');
    } else {
        volumeIcon.classList.add('bi-volume-up');
    }
});