let URL_rock = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=rock'
let URL_pop = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=pop'
let i = 0;
/* SALUTO AUTOMATICO*/
let contenitore = document.querySelector('#saluto');
        const ora = new Date().getHours();
        console.log(ora);

        function generaSaluto(orario){
     if (orario < 5) {
            contenitore.innerText = 'Buonanotte';
        } else if(orario < 12) {
            contenitore.innerText = 'Buongiorno, ben risvegliato';
        }else if(orario < 19) {
            contenitore.innerText = 'Buon Pomeriggio ';
        }else{
            contenitore.innerText = 'Buonasera';
        }
    }
    window.addEventListener(onload, generaSaluto(ora));

displayDataRock = function (data) {
    let rowReference = document.getElementById('row_rock')
    rowReference.innerHTML = ''
    for (i = 0; i < data.length && i < 6; i++) {
        let newCol = document.createElement('div');
        newCol.innerHTML = `
        <div class="cardsHome m-1 h-100">
                                <div class="item h-100">
                                    <img src=${data[i].album.cover_medium} class="width:100px"/>
                                    <div class="play">
                                        <i class="bi bi-play-fill"></i>
                                    </div>
                                    <a href="./artist_page.html?id=${data[i].artist.id}"><h4>${data[i].artist.name}</h4></a>
                                    <p>${data[i].album.title}</p>
                                </div>
                            </div>

        `;
        rowReference.appendChild(newCol);
    }
}

displayDataPop = function (data) {
    let rowReference = document.getElementById('row_pop')
    rowReference.innerHTML = ''
    for (i = 0; i < data.length && i < 6; i++) {
        let newCol = document.createElement('div');
        newCol.innerHTML = `
        <div class="cardsHome m-1 h-100">
                                <div class="item h-100">
                                    <img src=${data[i].album.cover_medium} style="width:130px" />
                                    <div class="play">
                                        <i class="bi bi-play-fill"></i>
                                    </div>
                                    <a href="./artist_page.html"><h4>${data[i].artist.name}</h4></a>
                                    <p>${data[i].album.title}</p>
                                </div>
                            </div>

        `;
        rowReference.appendChild(newCol);
    }
}


const getDataRock = function () {
    fetch(URL_rock)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return new Error('Errore nella gestione della chiamata')
            }
        })
        .then((data) => {
            displayDataRock(data.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

getDataRock()


const getDataPop = function () {
    fetch(URL_pop)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return new Error('Errore nella gestione della chiamata')
            }
        })
        .then((data) => {
            displayDataPop(data.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

getDataPop()


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