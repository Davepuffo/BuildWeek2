const ALBUM_URL = ' https://striveschool-api.herokuapp.com/api/deezer/album/'
let albumId = new URLSearchParams(window.location.search).get('id')
console.log('Id', albumId)

function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    const secondsString = seconds.toFixed(0).padStart(2, '0');
    return `${minutes}:${secondsString}`;
}


const showAlbum = function (album) {
    let albumBody = document.getElementsByClassName('album__body')[0]
    albumBody.style.backgroundImage = `url(${album.cover_big}), linear-gradient(180deg, rgba(0, 0, 0, 0.3967517401392111) 0%, rgba(0, 0, 0, 1) 25%); `
    console.log(albumBody)
    albumBody.innerHTML = `<div><img class="album__img shadow img-fluid ms-1 my-2 border" src="${album.cover_medium}" alt="${album.title}">
</div>
    <div class="ms-2 mt-sm-5 mt-md-0 mt-lg-0 mt-xl-0 album__info">
    <div class="mt-5">
    <p class="album__album fw-bolder mb-0 ms-1 mt-4">Album</p>
    <h2 class=" album__name fw-bolder ms-1">${album.title}</h2>
    </div>
    <div class="artist__info d-flex ms-2">
        <div class="d-flex mt-4 fs-6 art__inf">
            <img class="rounded-circle mx-1" src="${album.artist.picture_small}" alt="${album.artist.name}">
            <p class="fw-bold">${album.artist.name}</p>
            <p class="anno__ril">&nbsp&#183&nbsp${album.release_date}&nbsp&#183&nbsp</p>
            <p class="nr__canzoni">${album.nb_tracks} songs, <span class="opacity-50 small">${formatDuration(album.duration)}&nbspminutes</span>
            </p>
        </div>
        <p class="album__annoR d-sm-none opacity-50">Album&nbsp&#183&nbsp<span>${album.release_date}</span></p>
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
                <p class="text-white opacity-75 song__index">${songIndex}</p>
            </div>
         <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex flex-column ms-3">
                <p class="mb-1 text-white opacity-75">${song.title}</p>
                <p class="text-white opacity-50 small">${song.artist.name}</p>
            </div>
            <div>
            <i class="bi bi-three-dots-vertical mx-2 text-white opacity-75 d-none"></i>
            </div>
         </div>
        </div>
    </div>
    <div class="col-4 text-white opacity-75">
        <p class="ripro__numb">${song.rank}</p>
    </div>
    <div class="col-1 text-white opacity-75 song__time">
        <p class="song__time">${formatDuration(song.duration)}</p>
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

