/* eslint-disable @typescript-eslint/no-explicit-any */
// slices/movieSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '@/types/Movie';

interface Review {
  id: string;
  name: string;
  description: string;
  rating: number;
}

interface Testimonial {
  description: string;
  name: string;
  rating: number;
}

interface MovieState {
  jsonData: any[];
  testimonials: Testimonial[];
  movies: Movie[];
  reviews: Review[];
  activeMovie: Movie | null;
}

const initialState: MovieState = {
  jsonData: [],
  testimonials: [],
  movies: [],
  reviews: [],
  activeMovie: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setJsonData(state, action: PayloadAction<any[]>) {
      state.jsonData = action.payload;
    },
    setTestimonials(state, action: PayloadAction<Testimonial[]>) {
      state.testimonials = action.payload;
    },
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
    },
    addReview(state, action: PayloadAction<Review>) {
      state.reviews.push(action.payload);
    },
    updateReview(state, action: PayloadAction<Review>) {
      const index = state.reviews.findIndex(review => review.id === action.payload.id);
      if (index !== -1) {
        state.reviews[index] = action.payload;
      }
    },
    deleteReview(state, action: PayloadAction<string>) {
      state.reviews = state.reviews.filter(review => review.id !== action.payload);
    },
    setActiveMovie(state, action: PayloadAction<Movie | null>) {
      state.activeMovie = action.payload;
    },
  },
});

export const {
  setJsonData,
  setTestimonials,
  setMovies,
  addReview,
  updateReview,
  deleteReview,
  setActiveMovie,
} = movieSlice.actions;

export default movieSlice.reducer;
