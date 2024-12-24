import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/UserDetails';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

interface Movie {
  title: string;
  ratingsSummary: {
    aggregateRating: number;
    voteCount: number;
  };
  releaseYear: {
    endYear: null | number;
    year: number;
  };
  genres: string[];
  movieImage: string;
  imageCaption: string;
  tags: string[];
  runtime: {
    seconds: number;
  };
}

interface ReviewProps {
  email: string;
  movieId: string;
  name: string;
  description: string;
  stars: number;
  movie: Movie;
}

function Review() {
  const [data, setData] = useState<ReviewProps[]>([]);
  const { userDetails } = useUserContext();
  async function fetchDetails() {
    console.log(userDetails);
    if (userDetails?.email) {
      try {
        const res = await axios.get(`https://movieapi-rook.onrender.com/Review/reviews/${userDetails.email}`);
        setData(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
  }
  useEffect(() => {
    fetchDetails();
  }, [userDetails]);
  useEffect(()=>{fetchDetails()},[])
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6 text-center">Your Reviews</h1>
        <Table>
          <TableCaption>Review</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="border-white border-2 text-gray-300">Name</TableHead>
              <TableHead className="border-white border-2 text-gray-300">Description</TableHead>
              <TableHead className="border-white border-2 text-gray-300">Rating</TableHead>
              <TableHead className="border-white border-2 text-gray-300">Movie Title</TableHead>
              <TableHead className="border-white border-2 text-gray-300">Genres</TableHead>
              <TableHead className="border-white border-2 text-gray-300">Release Year</TableHead>
              <TableHead className="border-white border-2 text-gray-300">Runtime (Seconds)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((val: ReviewProps) => (
                <TableRow key={val.movieId}>
                  <TableCell className="border-white border-2 text-gray-200">{val?.name}</TableCell>
                  <TableCell className="border-white border-2 text-gray-200">{val?.description}</TableCell>
                  <TableCell className="border-white border-2 text-gray-200">{val?.stars}</TableCell>
                  <TableCell className="border-white border-2 text-gray-200">{val?.movie?.title}</TableCell>
                  <TableCell className="border-white border-2 text-gray-200">{val?.movie?.tags.join(", ")}</TableCell>
                  <TableCell className="border-white border-2 text-gray-200">{val?.movie?.releaseYear?.year}</TableCell>
                  <TableCell className="border-white border-2 text-gray-200">{val?.movie?.runtime?.seconds}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="border-white border-2 text-center text-gray-400">No reviews found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Review;
