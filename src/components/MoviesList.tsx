// MovieList.js
const assetsUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face/";
import React from 'react';
import Movie from '../types/Movie';

type MoviesByGenre = Record<string, Movie[]>;

interface MovieListProps {
  moviesByGenre: MoviesByGenre;
  onMovieClick: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({ moviesByGenre, onMovieClick }) => {
  return (
    <div className="container mt-4">
      {Object.keys(moviesByGenre).map((genre) => (
        <div key={genre} className="genre-section">
          <h2 className='mb-4'>{genre}</h2>
          <div className="row">
            {moviesByGenre[genre].map((movie) => (
              <div key={movie.id} className="col-md-2 mb-4 movie-list" onClick={() => onMovieClick(movie)}>
                <img src={assetsUrl + movie.poster_path} className='w-100' alt={movie.title} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
