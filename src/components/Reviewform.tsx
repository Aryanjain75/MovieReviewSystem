/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import {useUserContext} from '../context/UserDetails';
import axios from 'axios';

interface Review {
  movieId: string;
  id: string;
  name: string;
  email:string;
  description: string;
  rating: number;
}

interface ReviewformProps {
  movieId: string;
  createReview: (movieId: string, review: Review) => void;
  updateReview: (movieId: string, review: Review) => void;
  editingReview?: Review | null;
  setEditingReview: (review: Review | null) => void;
  setTestimonials: any;
}

const Reviewform: React.FC<ReviewformProps> = ({ movieId, createReview, updateReview, editingReview, setEditingReview ,setTestimonials}) => {
  const {isAuthenticated ,userDetails}=useUserContext();
  const [name, setName] = useState(editingReview?.name ||userDetails?.name|| '' );
  const [description, setDescription] = useState(editingReview?.description || '');
  const [rating, setRating] = useState<number | null>(editingReview?.rating ?? null);
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});
  useEffect(() => {
    if (editingReview) {
      setName(editingReview.name);
      setDescription(editingReview.description);
      setRating(editingReview.rating);
    }
  }, [editingReview]);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setErrors(prev => ({
      ...prev,
      name: /[^a-zA-Z\s]/.test(value) ? 'Name should contain only letters and spaces.' : '',
    }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDescription(value);
    setErrors(prev => ({
      ...prev,
      description: /[^a-zA-Z0-9\s.,!?]/.test(value) ? 'Description should not contain special characters.' : '',
    }));
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(parseFloat(e.target.value));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!errors.name && !errors.description && rating !== null) {
      const newReview: Review = {movieId,id: editingReview ? editingReview.id : new Date().toISOString(),name:userDetails?.name||name,description,rating,email:userDetails?.email||'',};
      if (editingReview) {
        updateReview(movieId, newReview);
      } else {
        createReview(movieId, newReview);
      }
      const [ unauthreview] = await Promise.all([
        axios.get(`https://movieapi-rook.onrender.com/Review/review/${movieId}/`)
      ]);
      setTestimonials([unauthreview.data.data]);
      resetForm();
    }
  };

  const resetForm = () => {
    setName(userDetails?.name||'');
    setDescription('');
    setRating(null);
    setEditingReview(null);
  };

  return (
    <Card className="mt-8 bg-gray-800 rounded-xl shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-white">{editingReview ? 'Edit Review' : 'Review Form'}</CardTitle>
        <CardDescription className="text-gray-300">Enter your review and rating</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-white">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            required
            className="bg-gray-700 text-white placeholder-gray-400 border-gray-600"
          />
          {errors.name && <p className="text-red-400">{errors.name}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description" className="text-white">Description</Label>
          <Input
            id="description"
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter description"
            required
            className="bg-gray-700 text-white placeholder-gray-400 border-gray-600"
          />
          {errors.description && <p className="text-red-400">{errors.description}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="rating" className="text-white">Rating</Label>
          <div className="rating rating-lg rating-half">
            {[...Array(10).keys()].map(index => (
              <input
                key={index}
                type="radio"
                name="rating"
                value={(index + 1) / 2}
                className={`mask mask-star-2 mask-half-${index % 2 === 0 ? '1' : '2'} bg-green-500`}
                onChange={handleRatingChange}
                checked={rating === (index + 1) / 2}
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isAuthenticated?"":<Link to="/Login" className="text-white">Login to submit review</Link>}
        <Button
          className="w-full bg-gradient-to-r from-teal-400 to-green-500 text-white"
          onClick={handleSubmit}
          disabled={!!(errors.name || errors.description || rating === null || !isAuthenticated)}
        >
          {editingReview ? 'Update Review' : 'Submit Review'}
        </Button>
      </CardFooter>
      <CardFooter>
        <Link to="/"
          className="w-full flex justify-center bg-gradient-to-r from-teal-400 to-green-500 text-white"
        >
          BACK TO HOME PAGE
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Reviewform;
