
const btn = document.getElementById('btn')
const searchEl = document.getElementById('search')
const container = document.getElementById('container')
const watchlistContainer = document.getElementById('watchlist-container')
let watchListArray = JSON.parse(localStorage.getItem("watchListArray")) || []
let searchResults = JSON.parse(localStorage.getItem("searchResults")) || []

// console.log(watchListArray)



const searchURL = "";  //replace with fetch URL
const getByIdURL = ""; //replace with fetch URL
const API_KEY = "accf6974";

function clickedMovie(id) {
    return id.imdbID === id
}


// IF THE CONTAINER DIV EXISTS CONDITION
if (document.contains(document.getElementById('container'))) {
    document.addEventListener('click', getSelectedMovie)

    function getSelectedMovie(e) {
        if(e.target.matches('.plus')) {
            let selectedMovieID = e.target.closest('img').id // returns the imdbID of the item that was selected
            let selectedMovie = searchResults.find(({imdbID}) => imdbID === selectedMovieID) // returns the selected movie object
            let addedToWatchlist = e.target.closest('.movie-container').querySelector('.watchlist')
            watchListArray.push(selectedMovie)
            localStorage.setItem("watchListArray", JSON.stringify(watchListArray))
            addedToWatchlist.textContent = "Added to watchlist"  
        }
}
}


// it works now just doesnt refresh immediately 
if (document.contains(document.getElementById('watchlist-container'))) {
    document.addEventListener('click', deleteFromWatchlist)
    
    if (watchListArray.length !== 0) {
        watchlistContainer.innerHTML = ''
        myFunction()
    } else {
        watchlistContainer.innerHTML = `<h4 id="empty-text">Your Watchlist is looking a little empty...</h4>`
    }
    
    function deleteFromWatchlist(e) {
        if(e.target.matches('.minus')) {
            let movieToDeleteID = e.target.closest('img').id
            let movieToDelete = watchListArray.find(({imdbID}) => imdbID === movieToDeleteID)
            let index = watchListArray.indexOf(movieToDelete)
            watchListArray.splice(index, 1)
            localStorage.setItem("watchListArray", JSON.stringify(watchListArray))
            // i feel like it has to go here
            if (watchListArray.length === 0) {
                watchlistContainer.innerHTML = `<h4 id="empty-text">Your Watchlist is looking a little empty...</h4>`
            } else {
                watchlistContainer.innerHTML = ''
                myFunction()

            }
            // check if watch array has any items - if yes then display them and remove the placeholder text if no keep placeholder text
        }
}
}



btn.addEventListener('click', () => {
    searchResults = []
    container.innerHTML = ''
    getimdbID()
    
    
})

function getimdbID() { // called when the button is clicked 
    fetch(`https://www.omdbapi.com/?apikey=accf6974&s=${searchEl.value}`) // makes API call based on search result
    .then(res => res.json())
    .then(data => { 
        // iterates over the data returned 
       for (let i=0; i < data.Search.length; i++) {
           getMovieById(data.Search[i].imdbID); //calls next function and passes in the search data at imdbID
       }
    })
}

function getMovieById(id) {
//take imdbArray itterate through it and return an array of movie objects 
    fetch(`https://www.omdbapi.com/?apikey=accf6974&i=${id}`)
    .then(res => res.json())
    .then(data => {
        searchResults.push(data)
        localStorage.setItem("searchResults", JSON.stringify(searchResults))
        //iterate over data
            addResult(data)
        //call addResult
    });
}

function addResult(movieInfo) {
    let movieArray = [movieInfo]
    let html = ""
    for (let movie of movieArray) {
        html += `
        <div class="movie-container">
            <div class="poster-container">
                <img src=${movie.Poster}/>
            </div>
            <div class="movie-details-container">
                <div class="title-rating">
                    <h2>${movie.Title}</h2>
                    <img id="star" src="Icon.svg" />
                    <p>${movie.imdbRating}</p>
                </div>
                <div class="time-genre">
                    <p class="time">${movie.Runtime}</p>
                    <p class="genre">${movie.Genre}</p>
                    <img class="plus" id=${movie.imdbID} src="./plus-icon.png" />
                    <p class="watchlist">Watchlist</p>
                </div>
                <p class="plot">${movie.Plot}</p>
            </div>
        </div>
        <hr/>
        `
    }
    container.innerHTML += html 
}




function myFunction() {


    let html = ""
    for (let movie of watchListArray) {  
            html += `
            <div class="movie-container">
                <div class="poster-container">
                    <img src=${movie.Poster}/>
                </div>
                <div class="movie-details-container">
                    <div class="title-rating">
                        <h2>${movie.Title}</h2>
                        <img id="star" src="Icon.svg" />
                        <p>${movie.imdbRating}</p>
                    </div>
                    <div class="time-genre">
                        <p class="time">${movie.Runtime}</p>
                        <p class="genre">${movie.Genre}</p>
                        <img class= "minus" id=${movie.imdbID} src="minus.svg" />
                        <p class="watchlist">Remove</p>
                    </div>
                    <p class="plot">${movie.Plot}</p>
                </div>
            </div>
            <hr/>
            `
        }
        return watchlistContainer.innerHTML += html

}
    






