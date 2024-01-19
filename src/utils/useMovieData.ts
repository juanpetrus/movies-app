// src/hooks/useMovieData.js
import { useState, useEffect } from 'react';
import Movie from '../types/Movie';

const useMovieData = () => {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

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

  return { movies, featuredMovies };
};

export default useMovieData;
