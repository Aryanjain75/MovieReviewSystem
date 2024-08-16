import { Movie } from "@/types/Movie";

// Action Types
export const SET_ACTIVE_MOVIE = 'SET_ACTIVE_MOVIE';
export const CREATE_REVIEW = 'CREATE_REVIEW';
export const UPDATE_REVIEW = 'UPDATE_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW';
export interface Review {
    id: string;
    movieId: string;
    name: string;
    description: string;
    rating: number;
  }
  
// Action Creators
export const setActiveMovie = (movie: Movie | null) => ({
  type: SET_ACTIVE_MOVIE,
  payload: movie,
});

export const createReview = (movieId: string, review: Review) => ({
  type: CREATE_REVIEW,
  payload: { movieId, review },
});

export const updateReview = (movieId: string, updatedReview: Review) => ({
  type: UPDATE_REVIEW,
  payload: { movieId, updatedReview },
});

export const deleteReview = (movieId: string, reviewId: string) => ({
  type: DELETE_REVIEW,
  payload: { movieId, reviewId },
});
