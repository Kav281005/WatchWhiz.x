import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import React from 'react';
import { fetchMovieDetails, removeFromWatchlist } from '../api';
import { useState } from 'react';

export default function Profile() {
    const [movies, setMovies] = useState([]);
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  
  useEffect(() => {
    async function load() {
      const res = await fetch('/api/watchlist', { credentials: 'include' });
      const data = await res.json();
      setWatchlist(data.watchlist); // assume array of IDs
    }
    load();
  }, []);
  
  const handleRemove = async (imdbID) => {
    await fetch('/api/watchlist/remove', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imdbID })
    });
    setWatchlist(watchlist.filter(id => id !== imdbID));
  };
  
  return (
    <div className="profile-page">
      <h2>{user.username}’s Profile</h2>
      <h3>Your Watchlist</h3>
      <div className="wl-grid">
        {watchlist.map(id => (
          <WatchlistCard key={id} imdbID={id} onRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
}

function WatchlistCard({ imdbID, onRemove }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/movies/${imdbID}`);
      const d = await res.json();
      setMovie(d);
    }
    load();
  }, [imdbID]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="card">
      <img src={movie.Poster} alt={movie.Title} />
      <h4>{movie.Title} ({movie.Year})</h4>
      <button onClick={() => onRemove(imdbID)}>Remove</button>
      <routerLink to={`/movie/${imdbID}`}>View Details</routerLink>
    </div>
  );
}
