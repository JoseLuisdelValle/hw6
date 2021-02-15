window.addEventListener('DOMContentLoaded', async function(event) {

    // Step 1: Construct a URL to get movies playing now from TMDB, fetch
    // ⬇️ ⬇️ ⬇️  

        event.preventDefault() 
        let apiKey = "962649350605037bfdaa1b94ae5eaaf2"
        let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US`)
        let json = await response.json()
        let movies = json.results
      
    // ⬆️ ⬆️ ⬆️ 
    // End Step 1
    
    // Step 2: 
    // ⬇️ ⬇️ ⬇️
         for (let i = 0; i < movies.length; i++) {
        let movie = movies[i]
        let movieID = movie.id
        let moviePosterPath = movie.poster_path

        document.querySelector('.movies').insertAdjacentHTML('beforeend', `
        <div class="movie-${movieID} w-1/5 p-4 ">
        <img src="https://image.tmdb.org/t/p/w500/${moviePosterPath}" class="w-full">
        <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
        </div>
        `)
    // ⬆️ ⬆️ ⬆️ 
    // End Step 2
  
    // Step 3: 
    // ⬇️ ⬇️ ⬇️
    document.querySelector(`.movie-${movieID}  .watched-button`).addEventListener('click', async function(event) {
        event.preventDefault()
        document.querySelector(`.movie-${movieID} `).classList.add('opacity-20')
        await db.collection('watched').doc(`${movieID}`).set({
            text: `${movieID}`
        })
        })
    }
    // ⬆️ ⬆️ ⬆️ 
    // End Step 3
  
    // Step 4: 
    let db = firebase.firestore()
    let querySnapshot  = await db.collection('watched').get()
    let moviesWatched = querySnapshot.docs

    for (let j=0; j < moviesWatched.length; j++ ) {
          let movieData = moviesWatched[j].data()
          let watchedMovie = movieData.text
         document.querySelector(`.movie-${watchedMovie} `).classList.add('opacity-20')
            }
      })
    