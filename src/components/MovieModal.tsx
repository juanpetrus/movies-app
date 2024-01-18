// MovieModal.js
const assetsUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face/";

import Movie from '../types/Movie';
import '../styles/MovieModal.css';
import genres from '../../public/data/genres.json';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
  isActive: boolean;
}

const MovieModal = ({ movie, onClose, isActive }: MovieModalProps) => {
  const modalClass = `movie-modal ${isActive ? 'active' : ''}`;
  const overlayClass = `movie-modal-overlay ${isActive ? 'active' : ''}`;
  const date = new Date(movie.release_date);
  const getGenreNames = (movie: Movie): string[] => {
    const movieGenres = genres.filter(genre => movie.genre_ids.includes(genre.id));
    return movieGenres.map(genre => genre.name);
  };
  return (
    <div className={overlayClass} onClick={onClose}>
      <div className={modalClass}>
        <span className="close" onClick={onClose}>&times;</span>
        <div className="modal-content">
          <div className="movie-details">
            <div className="movie-poster">
              <img src={assetsUrl + movie.poster_path} className='w-100' alt={movie.title} />
            </div>
            <div className="movie-description">
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <span>Language: {movie.original_language} <br></br> Date: {date.getFullYear()} - Popularity: <strong>{movie.popularity}</strong></span>
              <br></br>
              <span>Vote Average: {movie.vote_average}</span>
              <p>Genre: {getGenreNames(movie).join(', ')}</p>
              {/* Outras informações do filme aqui */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
