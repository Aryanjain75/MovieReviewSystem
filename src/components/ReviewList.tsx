import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  movieId: string;
  id: string;
  name: string;
  email:string;
  description: string;
  rating: number;
}

interface ReviewListProps {
  reviews:  Review[];
  movieId: string;
  deleteReview: (movieId: string, reviewId: string) => void;
  editReview: (review: Review) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, movieId, deleteReview, editReview }) => {
  const filteredReviews = reviews;
  console.log(filteredReviews);
  return (
    <div className="relative p-8 text-white">
      <div className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-teal-400 to-green-500 bg-clip-text text-transparent">
        Reviews
      </div>
      <Separator className="mb-6 bg-gradient-to-r from-teal-400 to-green-500" />

      <AnimatePresence>
        {filteredReviews.map((review) => (
          <motion.div
            key={review.description}
            initial={{ opacity: 0.5, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            exit={{ opacity: 0, x: -100 }}
            className="p-4 mb-4 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl shadow-lg"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{review.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200">{review.description}</p>
                <div className="flex justify-end mt-2">
                  <div className="rating rating-sm rating-half">
                  Rating: {"⭐".repeat(review.rating)}

                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="bg-gradient-to-r from-yellow-400 to-red-500 mr-2"
                  onClick={() => editReview(review)}
                >
                  Edit
                </Button>
                <Button
                  className="bg-gradient-to-r from-red-400 to-red-600"
                  onClick={() => deleteReview(movieId, review.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ReviewList;
