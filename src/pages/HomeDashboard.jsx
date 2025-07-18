// src/pages/HomeDashboard.jsx
import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api/fetchMovies';
import { Link } from 'react-router-dom';
import './HomeDashboard.css';
import { FaPlus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const HomeDashboard = () => {
const [movies, setMovies] = useState([]);
const { user } = useAuth();
async function handleAddToWatchlist(imdbID) {
    try {
      const res = await fetch('/api/watchlist', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imdbID })
      });
      if (!res.ok) throw new Error('Failed to add');
      // Optionally update local state/UI here
      alert('Added to your watchlist!');
    } catch (err) {
      console.error(err);
      alert('Error adding to watchlist');
    }
  }
useEffect(() => {
  fetchMovies().then((data) => {
    console.log("Movies:", data);
    setMovies(data);
  });
}, []);


  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <div className="dashboard-hero">
        <div className="dashboard-overlay" />
        <div className="dashboard-hero-content">
          <h1 className="dashboard-title">Welcome back to WatchWhiz.x</h1>
          <p className="dashboard-subtitle">Here’s your movie universe, personalized.</p>
        </div>
      </div>

      {/* Dashboard-only Sections */}
      <div className="dashboard-main">
        <div className='counts'>
        <section className="dashboard-section">
          <Link to="/watchlist" className="watchlist-link">Your Watchlist</Link>
          <p></p>
        </section>

        <section className="dashboard-section">
          <h2>Recently Watched</h2>
          
        </section>
        </div>

        {/* Movie Cards */}
      <div className='dash'>
        <section className="dashboard-section">
          <h2 className="section-title">🎬 Must Watches</h2>
          {movies.length === 0 ? (
            <p className="no-movies-text">No movies found</p>
          ) : (
            <div className="movie-grid">
              {movies.map((movie) => (
                <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`} className="movie-card-link">
                  <div className="movie-card">
                    <img
                      src={movie.Poster !== "N/A" ? movie.Poster : "/fallback.jpg"}
                      alt={movie.Title}
                      className="movie-poster"
                    />
                    <div className="movie-info">
                      <h3 className="movie-title">{movie.Title}</h3>
                      <p className="movie-year">{movie.Year}</p>
                      {/* <button
                         className="watchlist-icon"
                           onClick={(e) => {
                            e.preventDefault();
                             handleAddToWatchlist(movie);
                           }}
                        >
                          <FaPlus />
                      </button> */}
                      <div className="watchlist-icon">
                      <button
  onClick={() => handleAddToWatchlist(movie.imdbID)}
  disabled={!user}
>
  {user ? "add to watchlist ": "Log in to add"}
</button>
</div>

                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
      </div>
    </div>
  );
};

export default HomeDashboard;

