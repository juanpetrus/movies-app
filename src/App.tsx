// App.js
import React, { useState, useEffect } from 'react';
import MovieList from './components/MoviesList';
import MovieModal from './components/MovieModal';
import genresData from '../public/data/genres.json';
import Movie from './types/Movie';
import NavBar from './components/NavBar';
import MovieCarousel from './components/MovieCarousel';
import './App.css';

const App = () => {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [moviesByGenre, setMoviesByGenre] = useState<Record<string, Movie[]>>({}); // Tipo para moviesByGenre
  
  // Carregar e juntar os dados de diferentes arquivos JSON
  useEffect(() => {
    const loadData = async () => {
      // Caminhos relativos para os arquivos JSON
      const categories = ['now-playing', 'popular', 'top-rated', 'upcoming'];
      const allMovies: Movie[] = [];
      const featuredMovies: Movie[] = [];

      try {
        for (const category of categories) {
          const response = await fetch(`/data/${category}.json`);
          const categoryMovies: Movie[] = await response.json();
          // Filtra apenas os movies que ainda não estão na lista
          const newMovies = categoryMovies.filter(movie => !allMovies.some(existingMovie => existingMovie.id === movie.id));
          allMovies.push(...newMovies);
          const featuredCategoryMovies = categoryMovies.filter(movie => movie.featured);
          featuredMovies.push(...featuredCategoryMovies);
        }
        setMovies(allMovies);
        setFeaturedMovies(featuredMovies);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    loadData();
  }, []);


  useEffect(() => {
    // Filtra os filmes com base no termo de busca
    const filtered = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre_ids.some((genreId) => {
          const genre = genresData.find((g) => g.id === genreId);
          return genre && genre.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
    );
    setFilteredMovies(filtered);
  }, [searchTerm, movies]);

  useEffect(() => {
    // Agrupa os filmes por gênero
    const groupedByGenre = filteredMovies.reduce((acc, movie) => {
      movie.genre_ids.forEach((genreId) => {
        const genre = genresData.find((g) => g.id === genreId);
        const genreName = genre ? genre.name : 'Other';
        acc[genreName] = acc[genreName] || [];
        acc[genreName].push(movie);
      });
      return acc;
    }, {} as Record<string, Movie[]>); // Inicialize com um objeto vazio

    setMoviesByGenre(groupedByGenre);
  }, [filteredMovies]);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleSearchChange = (event: string) => {
    setSearchTerm(event);
  };

  return (
    <div className="app">
      <NavBar inputValue={searchTerm} onChange={handleSearchChange} />
      {searchTerm === '' && <MovieCarousel movies={featuredMovies} onMovieClick={handleMovieClick} />}
      {searchTerm != '' && <div className='container'><p>O que você está pesquisando: {searchTerm}</p></div>}
      <MovieList moviesByGenre={moviesByGenre} onMovieClick={handleMovieClick} />
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} isActive={!!selectedMovie} />}
    </div>
  );
};

export default App;
