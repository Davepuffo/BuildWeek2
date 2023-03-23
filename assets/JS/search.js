let URL = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=';
let resultSection = document.getElementById('results')

displayResults = function (results) {
  let titoloRisultati = document.getElementById('titoloRicerca')
  titoloRisultati.classList.remove('d-none')
  let sfogliaSection = document.getElementById('sfoglia')
  sfogliaSection.classList.add('d-none')
  resultSection.innerHTML =''
  results.forEach(result => {
      let colResult = document.createElement('div');
      colResult.classList.add('col-12','col-md-4','col-lg-2');
      colResult.innerHTML = `
      <div class="cardsHome my-2">
                              <div class="item">
                              <img src=${result.album.cover_medium} class="width:100px"/>
                                  <div class="play">
                                      <i class="bi bi-play-fill"></i>
                                  </div>
                                  <a href="./artist_page.html?id=${result.artist.id}" class="text-decoration-none text-light"><h4>${result.artist.name}</h4></a>
                                  <a href="./album_page.html?id=${result.album.id}" class="text-decoration-none text-light d-block text-truncate" style="max-width:200px;" ><p>${result.album.title}</p></a>
                                  <p class="d-block text-truncate" style="max-width:200px; color:white;">${result.title}</p>
                              </div>
                          </div>
      `;
    resultSection.appendChild(colResult);
  });
};

const loadResults = query => {
  fetch(URL + query)
  .then((response)=> {
      if(response.ok){
          return response.json()
      }else {
          return new Error('Errore nella gestione della chiamata')
      }
  })
  .then((data)=>{
      displayResults(data.data)
  })
  .catch((err) => {
      console.log(err)
  })
}

let searchQuery;

const handleSearchQuery = e => {
searchQuery = e.target.value.toLowerCase();
};

const searchResults = () => {
loadResults(searchQuery);
};

window.onload = () => {

  const searchInput = document.querySelector(".form-control")
  searchInput.oninput = (event) => handleSearchQuery(event)

  const searchBtn = document.getElementById('search')
  searchBtn.onclick = () => searchResults()

  resultSection.innerHTML=''
}