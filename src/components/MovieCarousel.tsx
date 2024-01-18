const assetsUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face/";
import Carousel from 'react-bootstrap/Carousel';
import Movie from '../types/Movie';

interface MovieProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const MovieCarousel = ({ movies, onMovieClick }: MovieProps) => {
  return (
    <Carousel className='mb-4'>
      {
        movies.map(movie => (
          <Carousel.Item key={movie.id} className='carousel-aling' onClick={() => onMovieClick(movie)}>
            <img
              className="carousel-img"
              src={assetsUrl + movie.backdrop_path}
              alt="First slide"
            />
            <Carousel.Caption>
              <h5>{movie.title}</h5>
              <p>{movie.overview}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))
      }
    </Carousel>
  );
}

export default MovieCarousel;