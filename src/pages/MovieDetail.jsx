// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const MovieDetail = () => {
//   const { id } = useParams();
//   const [movie, setMovie] = useState(null);

//   useEffect(() => {
//     fetch(`/api/movies/${id}`, {
//    credentials: 'include'
//       })
//       .then(res => res.json())
//       .then(data => setMovie(data));
//   }, [id]);

//   if (!movie) return <div className="text-white p-4">Loading...</div>;

//   return (
//     <div className="text-white p-6">
//       <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
//       <img src={movie.Poster} alt={movie.Title} className="w-64 mb-4" />
//       <p><strong>Year:</strong> {movie.Year}</p>
//       <p><strong>Genre:</strong> {movie.Genre}</p>
//       <p><strong>Plot:</strong> {movie.Plot}</p>
//     </div>
//   );
// };
// src/pages/MovieDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/movies/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setMovie(data);
      })
      .catch(() => setError('Failed to load movie'));
  }, [id]);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!movie) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} style={{ width: 300 }} />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
    </div>
  );
}

//export default MovieDetail;
