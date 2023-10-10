
const btn = document.getElementById('btn')
const searchEl = document.getElementById('search')
const container = document.getElementById('container')
const watchlistContainer = document.getElementById('watchlist-container')
let watchListArray = JSON.parse(localStorage.getItem("watchListArray")) || []


const searchURL = "";  //replace with fetch URL
const getByIdURL = ""; //replace with fetch URL
const API_KEY = "accf6974";


// IF THE CONTAINER DIV EXISTS CONDITION
if (document.contains(document.getElementById('container'))) {
// adds event listener to all container and calls getselectedmovie
let selectedMovie = document.querySelector('#container')
selectedMovie.addEventListener('click', getSelectedMovie)

// says if clicked item has id of plus then grab its closest div of movie container
// pushes that to the array
function getSelectedMovie(e) {
    if(e.target.matches('#plus')) {
        let selectedMovie = e.target.closest('.movie-container').outerHTML
        let addedToWatchlist = e.target.closest('.movie-container').querySelector('.watchlist')
        // maybe change the plus to minus and remove before its pushed to the array
        watchListArray.push(selectedMovie)
        localStorage.setItem("watchListArray", JSON.stringify(watchListArray))
        addedToWatchlist.textContent = "Added to watchlist"
        
        

    }
}
}


// it works now just doesnt refresh immediately 
if (document.contains(document.getElementById('watchlist-container'))) {
const movieToDelete = document.querySelector('#watchlist-container') //shouldn't have the same variable name as below
movieToDelete.addEventListener('click', deleteFromWatchlist)

function deleteFromWatchlist(e) {
    if(e.target.matches('#plus')) {
        let movieToDelete = e.target.closest('.movie-container').outerHTML
        let index = watchListArray.indexOf(movieToDelete)
        watchListArray.splice(index, 1)
        localStorage.setItem("watchListArray", JSON.stringify(watchListArray))
        watchlistContainer.innerHTML = watchListArray
    }
}
}


// get the div of the selected watchlist item
// remove it from localstoraage 

btn.addEventListener('click', () => {
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
        //iterate over data
            addResult(data)
        //call addResult
    });
}

function addResult(movieInfo) {
    let movieArray = [movieInfo]
    // Add to DOM
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
                    <img class= "plus" id="plus" src="plus.svg" />
                    <img class= "minus" id="minus" src="minus.svg" />
                    <p id="addedToWl" class="addedToWl">Added to watchlist</p>
                    <p class="watchlist">Watchlist</p>
                </div>
                <p class="plot">${movie.Plot}</p>
            </div>
        </div>
        <hr/>
        `
    }
    container.innerHTML += html
    
    //this works but i think could be alot cleaner
    const minusIcon = document.querySelectorAll('#minus')
    for (let icon of minusIcon) {
        icon.style.display = 'none'
    }   
}




function myFunction() {
    // let watchlist = JSON.parse(localStorage.getItem("watchListArray"))
    

    for (let movie of watchListArray) {  
        console.log(movie)
    watchlistContainer.innerHTML += movie
    }
    
    // could move to helper function later
//     const plusIcon = document.querySelectorAll('#plus')
//     for (let icon of plusIcon) {
//         icon.style.display = 'none'
//     }
    
//     const minusIcon = document.querySelectorAll('#minus')
//     for (let icon of minusIcon) {
//         icon.style.display = 'block'
//     }   
    
//     const changeToRemove = document.querySelectorAll('.watchlist')
//     for (let item of changeToRemove) {
//         item.textContent = 'Remove'
//     }
}


// var el = document.querySelectorAll('#site-nav__link-id');

// for (var i = 0; i < el.length; i++) {
//     var currentEl = el[i];
//     currentEl.style.color = 'white';
// }





