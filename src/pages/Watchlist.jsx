
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Watchlist = () => {
//   const [watchlist, setWatchlist] = useState([]);
// const navigate = useNavigate();
//   useEffect(() => {
//   fetch('/api/watchlist', { credentials: 'include' })
//     .then(res => res.json())
//     .then(data => {
//       // fetch details: details = data.watchlist.map(id => fetch(`/api/movies/${id}`)...)
//       setWatchlist(data.watchlist || []);
//     });
// }, []);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem('watchlist')) || [];
//     setWatchlist(stored);
//   }, []);


// export default Watchlist;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Watchlist.css';

export default function Watchlist() {
  // const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Step 1: Get the list of saved IMDb IDs
    fetch('/api/watchlist', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        const ids = data.watchlist || [];
        if (ids.length === 0) {
          setWatchlist([]);
          return;
        }
        // Step 2: Fetch details for each movie
        return Promise.all(
          ids.map(id =>
            fetch(`/api/movies/${id}`, { credentials: 'include' })
              .then(res => res.json())
          )
        );
      })
      .then(detailedMovies => {
        if (detailedMovies) setWatchlist(detailedMovies);
      })
      .catch(err => console.error("Failed to load watchlist:", err));
  }, []);

  return (
    // <div className="p-6 text-white">
     

    //   <h2 className="text-2xl mb-4">Your Watchlist</h2>
    //   {movies.length === 0 ? (
    //     <p>No movies in watchlist.</p>
    //   ) : (
    //     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    //       {movies.map((movie) => (
    //         <div key={movie.imdbID} className="bg-gray-800 p-2 rounded shadow">
    //           <img 
    //             src={movie.Poster !== 'N/A' ? movie.Poster : '/fallback.jpg'} 
    //             alt={movie.Title} 
    //             className="w-full h-60 object-cover" 
    //           />
    //           <h3 className="mt-2 text-lg font-semibold">{movie.Title}</h3>
    //           <p>{movie.Year}</p>
    //         </div>
    //       ))}
    //     </div>
    //   )}
  <div className="watchlist-container">
    <h2>Your Watchlist</h2>
    {watchlist.length === 0 ? (
      <p>No movies in your watchlist.</p>
    ) : (
      <div className="watchlist-grid">
        {watchlist.map(movie => (
          <div key={movie.imdbID} className="watchlist-card">
            <img src={movie.Poster} alt={movie.Title} />
            <div className="watchlist-card-body">
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    )}
       <button 
        onClick={() => navigate('/')} 
        className="mb-4 px-4 py-2 bg-gray-700 rounded"
      >
        ← Back to Home
      </button>
    </div>
  );
};
