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

displayDataRock = function(data) {
    let rowReference = document.getElementById('row_rock')
    rowReference.innerHTML = ''
    for (i=0; i<data.length && i<6; i++) {
        let newCol = document.createElement('div');
        newCol.innerHTML = `
        <div class="cardsHome m-1 h-100">
                                <div class="item h-100">
                                    <img src=${data[i].album.cover_medium} class="width:100px"/>
                                    <div class="play">
                                        <i class="bi bi-play-fill"></i>
                                    </div>
                                    <h4>${data[i].artist.name}</h4>
                                    <p>${data[i].album.title}</p>
                                </div>
                            </div>

        `;
        rowReference.appendChild(newCol);
    }
}

displayDataPop = function(data) {
    let rowReference = document.getElementById('row_pop')
    rowReference.innerHTML = ''
    for (i=0; i<data.length && i<6; i++) {
        let newCol = document.createElement('div');
        newCol.innerHTML = `
        <div class="cardsHome m-1 h-100">
                                <div class="item h-100">
                                    <img src=${data[i].album.cover_medium} style="width:130px" />
                                    <div class="play">
                                        <i class="bi bi-play-fill"></i>
                                    </div>
                                    <h4>${data[i].artist.name}</h4>
                                    <p>${data[i].album.title}</p>
                                </div>
                            </div>

        `;
        rowReference.appendChild(newCol);
    }
}


const getDataRock = function() {
    fetch(URL_rock)
.then((response)=>{
    if(response.ok){
        return response.json()
    }else {
        return new Error('Errore nella gestione della chiamata')
    }
})
.then((data)=>{
displayDataRock(data.data)
})
.catch((err) => {
    console.log(err)
})
}

getDataRock()


const getDataPop = function() {
    fetch(URL_pop)
.then((response)=>{
    if(response.ok){
        return response.json()
    }else {
        return new Error('Errore nella gestione della chiamata')
    }
})
.then((data)=>{
displayDataPop(data.data)
})
.catch((err) => {
    console.log(err)
})
}

getDataPop()




