/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Review {
  id: string;
  name: string;
  description: string;
  rating: number;
}

interface ReviewState {
  reviews: Review[];
  editingReview: Review | null;
}

const initialState: ReviewState = {
  reviews: [],
  editingReview: null,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReviews(state: { reviews: any; }, action: PayloadAction<Review[]>) {
      state.reviews = action.payload;
    },
    addReview(state: { reviews: any[]; }, action: PayloadAction<Review>) {
      state.reviews.push(action.payload);
    },
    updateReview(state: { reviews: any[]; }, action: PayloadAction<Review>) {
      const index = state.reviews.findIndex((review: { id: any; }) => review.id === action.payload.id);
      if (index !== -1) {
        state.reviews[index] = action.payload;
      }
    },
    deleteReview(state: { reviews: any[]; }, action: PayloadAction<string>) {
      state.reviews = state.reviews.filter((review: { id: any; }) => review.id !== action.payload);
    },
    setEditingReview(state: { editingReview: any; }, action: PayloadAction<Review | null>) {
      state.editingReview = action.payload;
    },
  },
});

export const { setReviews, addReview, updateReview, deleteReview, setEditingReview } = reviewSlice.actions;
export default reviewSlice.reducer;
