"use client";
import React from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";

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

export const MovieDetails: React.FC<MovieCardProps> = ({ movie })=> {
  return (
    <div>
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 bg-[#020616]">
        <img
          src={movie.image}
          alt={movie.title}
          style={{height:"400px",width:"400px"}}
          className="object-contain"
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
        {movie.title}
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Rating: {movie.rating} ({movie.voteCount} votes) | Release Year: {movie.releaseYear}

        </p>
        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span>Details</span>
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            $100
          </span>
        </button>
      </BackgroundGradient>
    </div>
  );
}
