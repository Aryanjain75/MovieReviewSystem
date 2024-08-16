/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState } from 'react';
import { Movie } from '@/types/Movie';  // Adjust the import based on your actual Movie type definition
import { convertMovieData } from '@/components/utils/convertMovieData';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMovie, createReview, updateReview, deleteReview } from '@/actions/MoviesActions';
import { RootState } from '@/services/store'; // Adjust the import path
// Sample JSON data
const jsonData = [
  {
    node: {
      id: "tt26548265",
      titleText: { text: "Maharaja" },
      ratingsSummary: { aggregateRating: 8.6, voteCount: 36527 },
      releaseYear: { year: 2024 },
      titleGenres: { genres: [{ genre: { text: "Action" }}, { genre: { text: "Crime" }}, { genre: { text: "Drama" }}] },
      primaryImage: { url: "https://m.media-amazon.com/images/M/MV5BOTFlMTIxOGItZTk0Zi00MTk2LWJiM2UtMzlhZWYzNjQ4N2Y3XkEyXkFqcGc@._V1_.jpg" }
    }
  },
  {
    node: {
      id: "tt19838634",
      titleText: { text: "Ulajh" },
      ratingsSummary: { aggregateRating: 7.9, voteCount: 19584 },
      releaseYear: { year: 2024 },
      titleGenres: { genres: [{ genre: { text: "Thriller" }}] },
      primaryImage: { url: "https://m.media-amazon.com/images/M/MV5BZDEwZjRlYzMtNDc2Ny00Y2Q4LTk1NmQtYmU3NzZhMzNiZWI4XkEyXkFqcGc@._V1_.jpg" }
    }
  },
  {
    node: {
      id: "tt27411674",
      titleText: { text: "Shekhar Home" },
      ratingsSummary: { aggregateRating: 8.6, voteCount: 3799 },
      releaseYear: { year: 2024 },
      titleGenres: { genres: [{ genre: { text: "Crime" }}, { genre: { text: "Drama" }}] },
      primaryImage: { url: "https://m.media-amazon.com/images/M/MV5BMTI4M2Y1ZDEtMWE1Mi00YzM5LTk5NGItMDlkNmMzODliM2NmXkEyXkFqcGc@._V1_.jpg" }
    }
  },
  {
    node: {
      id: "tt6263850",
      titleText: { text: "Deadpool & Wolverine" },
      ratingsSummary: { aggregateRating: 8.1, voteCount: 215821 },
      releaseYear: { year: 2024 },
      titleGenres: { genres: [{ genre: { text: "Action" }}, { genre: { text: "Adventure" }}, { genre: { text: "Comedy" }}] },
      primaryImage: { url: "https://m.media-amazon.com/images/M/MV5BMTI4M2Y1ZDEtMWE1Mi00YzM5LTk5NGItMDlkNmMzODliM2NmXkEyXkFqcGc@._V1_.jpg" }
    }
  },
  {
    node: {
      id: "tt5525650",
      titleText: { text: "The Goat Life" },
      ratingsSummary: { aggregateRating: 8.1, voteCount: 13703 },
      releaseYear: { year: 2024 },
      titleGenres: { genres: [{ genre: { text: "Adventure" }}, { genre: { text: "Drama" }}] },
      primaryImage: { url: "https://m.media-amazon.com/images/M/MV5BNjUzYzYzMTQtMmU2Yy00YjEzLWEyMDgtNTlkOTAyNzE4ZWQ4XkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_.jpg" }
    }
  },
  {
    node: {
      id: "tt9691290",
      titleText: { text: "Sharmajee Ki Beti" },
      ratingsSummary: { aggregateRating: 8.2, voteCount: 4924 },
      releaseYear: { year: 2024 },
      titleGenres: { genres: [{ genre: { text: "Comedy" }}, { genre: { text: "Drama" }}] },
      primaryImage: { url: "https://m.media-amazon.com/images/M/MV5BNWNhNTI5YmMtYWVlMS00N2NkLWE1NWYtMTU2NjA2ZGM3NjQxXkEyXkFqcGc@._V1_.jpg" }
    }
  },
  {
    node: {
      id: "tt33040269",
      titleText: { text: "Ghuspaithiya" },
      ratingsSummary: { aggregateRating: 9, voteCount: 2148 },
      releaseYear: { year: 2024 },
      titleGenres: { genres: [{ genre: { text: "Drama" }}] },
      primaryImage: { url: "https://m.media-amazon.com/images/M/MV5BMjYzNTE3ZDktYWM3NS00NWYyLWJmMTUtZmJkNmI5MGQ1ZmU4XkEyXkFqcGc@._V1_.jpg" }
    }
  }
];

// Define interfaces
interface Review {
    id: string;
    movieId: string;
    name: string;
    description: string;
    rating: number;
  }
  
  interface Testimonial {
    description: string;
    name: string;
    rating: number;
  }
  
  interface MovieContextType {
    movies: Movie[];
    activeMovie: Movie | null;
    reviews: Review[];
    testimonials: Testimonial[];
    setActiveMovie: (movie: Movie | null) => void;
    createReview: (movieId: string, review: Review) => void;
    updateReview: (movieId: string, updatedReview: Review) => void;
    deleteReview: (movieId: string, reviewId: string) => void;
  }
  
  // Create context
  const MovieContext = createContext<MovieContextType | undefined>(undefined);
  
  // Provide context values
  export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([
      {
        description: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
        name: "Martin Luther King Jr.",
        rating: 5,
      },
      {
        description: "The only limit to our realization of tomorrow is our doubts of today.",
        name: "Franklin D. Roosevelt",
        rating: 4,
      },
      {
        description: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        name: "Winston Churchill",
        rating: 5,
      },
      {
        description: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
        name: "Ralph Waldo Emerson",
        rating: 5,
      },
      {
        description: "In three words I can sum up everything I've learned about life: it goes on.",
        name: "Robert Frost",
        rating: 4,
      }
    ]);
  
    const dispatch = useDispatch();
    const { activeMovie } = useSelector((state: RootState) => state.movie);
  
   
  // Handle Active Movie
  const handleSetActiveMovie = (movie: Movie | null) => {
    dispatch(setActiveMovie(movie));
  };

  // Handle Creating Review
  const handleCreateReview = (movieId: string, review: Review) => {
    setReviews(prev => [...prev, { ...review, movieId }]);
    dispatch(createReview(movieId, review));
  };

  // Handle Updating Review
  const handleUpdateReview = (movieId: string, updatedReview: Review) => {
    setReviews(prev =>
      prev.map(review => (review.id === updatedReview.id && review.movieId === movieId ? updatedReview : review))
    );
    dispatch(updateReview(movieId, updatedReview));
  };

  // Handle Deleting Review
  const handleDeleteReview = (movieId: string, reviewId: string) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId || review.movieId !== movieId));
    dispatch(deleteReview(movieId, reviewId));
  };

    return (
      <MovieContext.Provider
        value={{ 
          movies: jsonData.map(convertMovieData), 
          activeMovie, 
          reviews, 
          testimonials, 
          setActiveMovie: handleSetActiveMovie, 
          createReview: handleCreateReview, 
          updateReview: handleUpdateReview, 
          deleteReview: handleDeleteReview 
        }}
      >
        {children}
      </MovieContext.Provider>
    );
  };
  
  // Custom hook for using context
  export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (!context) {
      throw new Error('useMovieContext must be used within a MovieProvider');
    }
    return context;
  };