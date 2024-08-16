/* eslint-disable @typescript-eslint/no-explicit-any */
import { SET_ACTIVE_MOVIE, CREATE_REVIEW, UPDATE_REVIEW, DELETE_REVIEW } from '@/actions/MoviesActions';
import { Movie } from '@/types/Movie';
export interface Review {
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
  
interface MovieState {
  activeMovie: Movie | null;
  reviews: Review[];
  testimonials: Testimonial[];
}

const initialState: MovieState = {
  activeMovie: null,
  reviews: [],
  testimonials: [], // Initialize with your testimonials
};

const movieReducer = (state = initialState, action: any): MovieState => {
  switch (action.type) {
    case SET_ACTIVE_MOVIE:
      return { ...state, activeMovie: action.payload };
    case CREATE_REVIEW:
      return { ...state, reviews: [...state.reviews, { ...action.payload.review, movieId: action.payload.movieId }] };
    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review.id === action.payload.updatedReview.id && review.movieId === action.payload.movieId
            ? action.payload.updatedReview
            : review
        ),
      };
    case DELETE_REVIEW:
      return { ...state, reviews: state.reviews.filter(review => review.id !== action.payload.reviewId || review.movieId !== action.payload.movieId) };
    default:
      return state;
  }
};

export default movieReducer;
