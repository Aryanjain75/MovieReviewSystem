/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "node_modules/react-resizable-panels/dist/declarations/src/vendor/react";

export interface Movie {
    description: any;
    ctaLink: string | undefined;
    ctaText: ReactNode ;
    content: any;
    id: string;
    title: string;
    rating: number;
    voteCount: number;
    releaseYear: number;
    genres: string[];
    image: string;
  }
  