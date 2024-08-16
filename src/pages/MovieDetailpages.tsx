/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMovieContext } from '@/context/MovieContext';
import { MovieDetails } from '@/components/MovieDetails';
import Reviewform from '@/components/Reviewform';
import ReviewList from '@/components/ReviewList';
import { LampContainer } from '@/components/ui/lamp';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { Button } from '@/components/ui/button';
import { X as CloseIcon } from 'lucide-react';
import { Movie } from '@/types/Movie';
interface Review {
  movieId:any;
  id: string;
  name: string;
  description: string;
  rating: number;
}
const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    testimonials,
    movies,
    reviews,
    createReview,
    updateReview,
    deleteReview,
  } = useMovieContext();

  const movie = movies.find((movie) => movie.id === id);

  const [editingReview, setEditingReview] = useState<Review | null>(null); // Corrected type

  const editReview = (review: Review) => {
    setEditingReview(review);
  };

  const [active, setActive] = useState<Movie | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    document.body.style.overflow = active && typeof active === "object" ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <>
      <div className="bg-[#020616]">
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Welcome to
            <br /> Movie Review
          </motion.h1>
        </LampContainer>
        <div className="relative p-8 top-[-12rem] grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
          <div className="flex justify-center items-center">
            <MovieDetails movie={movie} />
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-xl shadow-lg">
            <div className="text-3xl font-bold mb-4">Movie Details</div>
            <div className="text-lg mb-2">
              <div className="font-semibold">Name: {movie.title}</div>
              <div className="font-semibold">Rating: {movie.rating}</div>
              <div className="font-semibold">Votes: {movie.voteCount}</div>
              <div className="font-semibold">Release Year: {movie.releaseYear}</div>
              <div className="font-semibold">Genres: {movie.genres.join(', ')}</div>
            </div>
            <div className="">
              <Reviewform
                movieId={movie.id}
                createReview={createReview}
                updateReview={updateReview}
                editingReview={editingReview}
                setEditingReview={setEditingReview}
              />
            </div>
          </div>
        </div>

        <ReviewList
          reviews={reviews}
          movieId={movie.id}
          deleteReview={deleteReview}
          editReview={editReview}
        />
        <InfiniteMovingCards items={testimonials} />
      </div>

      {active && typeof active === "object" && (
        <AnimatePresence>
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center backdrop-blur-sm bg-black/80"
          >
            <motion.div
              key={active.id}
              initial={{ scale: 0.95, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-xl relative flex flex-col items-center justify-center"
            >
              <button
                className="absolute top-2 right-2 rounded-full bg-gray-800 p-1 text-white hover:bg-gray-700"
                onClick={() => setActive(false)}
              >
                <CloseIcon size={20} />
              </button>
              <h2 className="text-3xl font-bold mb-2">{active.title}</h2>
              <p className="text-gray-300 mb-4">{active.description}</p>
              <Button className="bg-gradient-to-r from-teal-400 to-green-500 text-white">
                Start Now
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default MovieDetailsPage;
