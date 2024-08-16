import React from 'react';
import { motion } from 'framer-motion';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
export interface Movie {
    id: string;
    title: string;
    rating: number;
    voteCount: number;
    releaseYear: number;
    genres: string[];
    image: string;
  }

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <CardContainer className="inter-var w-[300px]" >
      <CardBody className="bg-transparent relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] border-white/[0.2]  w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {movie.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Rating: {movie.rating} ({movie.voteCount} votes) | Release Year: {movie.releaseYear}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={movie.image}
            style={{ height: "20rem", width: "auto" }}
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={movie.title}
          />
        </CardItem>
        <div className="flex justify-between items-center mt-4">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black border-white border-2 text-white text-xs font-bold"
          >
            Show more details
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  </motion.div>
);

export default MovieCard;
