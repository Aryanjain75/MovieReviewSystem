/* eslint-disable @typescript-eslint/no-explicit-any */
import { Movie } from '@/types/Movie';

export const convertMovieData = (data: any): Movie => {
    return {
      id: data.node.id,
      title: data.node.titleText.text,
      rating: data.node.ratingsSummary.aggregateRating,
      voteCount: data.node.ratingsSummary.voteCount,
      releaseYear: data.node.releaseYear.year,
      genres: data.node.titleGenres.genres.map((genre:any) => genre.genre.text),
      image: data.node.primaryImage.url
    };
  };
  
  

// Example usage with the additional JSON data
