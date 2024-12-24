/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState } from 'react';
import { Movie } from '@/types/Movie';  // Adjust the import based on your actual Movie type definition
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMovie, createReview, updateReview, deleteReview } from '@/actions/MoviesActions';
import { RootState } from '@/services/store'; // Adjust the import path
import { useUserContext } from './UserDetails';
import axios from 'axios';

// Define interfaces
interface Review {
    id: string;
    movieId: string;
    name: string;
    email:string;
    description: string;
    rating: number;
  }
  
  interface Testimonial {
    id: string;
    movieId: string;
    name: string;
    email:string;
    description: string;
    rating: number;
  }
  
  interface MovieContextType {
    activeMovie: Movie | null;
    reviews: Review[];
    testimonials: Testimonial[];
    setActiveMovie: (movie: Movie | null) => void;
    createReview: (movieId: string, review: Review) => void;
    updateReview: (movieId: string, updatedReview: Review) => void;
    deleteReview: (movieId: string, reviewId: string) => void;
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
    setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  }
  
  // Create context
  const MovieContext = createContext<MovieContextType | undefined>(undefined);
  
  // Provide context values
  export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    const dispatch = useDispatch();
    const { activeMovie } = useSelector((state: RootState) => state.movie);
  
   
  // Handle Active Movie
  const handleSetActiveMovie = (movie: Movie | null) => {
    dispatch(setActiveMovie(movie));
  };

  // Handle Creating Review
  const handleCreateReview = async(movieId: string, review: Review) => {
    setReviews(prev => [...prev, { ...review, movieId }]);
    dispatch(createReview(movieId, review));
    try {
      await axios.post("https://movieapi-rook.onrender.com/Review/reviews",review);
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  // Handle Updating Review
  const handleUpdateReview = async(movieId: string, updatedReview: Review) => {
    setReviews(prev =>
      prev.map(review => (review.id === updatedReview.id && review.movieId === movieId ? updatedReview : review))
    );
    dispatch(updateReview(movieId, updatedReview));
    try {
      await axios.put(`https://movieapi-rook.onrender.com/Review/reviews/${updatedReview.id}/${movieId}`, updatedReview);
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  // Handle Deleting Review
  const handleDeleteReview = async(movieId: string, reviewId: string) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId || review.movieId !== movieId));
    dispatch(deleteReview(movieId, reviewId));
    try {
      await axios.delete(`https://movieapi-rook.onrender.com/Review/reviews/${reviewId}/${movieId}`);
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

    return (
      <MovieContext.Provider
        value={{ 
          activeMovie, 
          setTestimonials,
          reviews, 
          setReviews,
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
