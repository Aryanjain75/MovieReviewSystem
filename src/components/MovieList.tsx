import React, { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import { Link } from "react-router-dom";
import axios from "axios";

export interface Movie {
  id: string;
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
}

function App() {
  const [data, setData] = useState<Movie[]>([]);
  const [filters, setFilters] = useState({
    title: "",
    minYear: "",
    maxYear: "",
    minRating: "",
    maxRating: "",
    tags: "",
  });
  const [availableFilters, setAvailableFilters] = useState({
    tags: [],
    certificates: [],
    releaseYears: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8); // Number of movies per page
  const [totalMovies, setTotalMovies] = useState(0);

  useEffect(() => {
    // Fetch available filters
    const fetchFilters = async () => {
      try {
        const res = await axios.get(`https://movieapi-rook.onrender.com/filters`);
        setAvailableFilters(res.data.data);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    // Fetch movies based on filters and pagination
    const fetchMovies = async () => {
      try {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const query = new URLSearchParams({
          start: start.toString(),
          end: end.toString(),
          ...filters, // Spread filters into the query
        }).toString();
        const res = await axios.get(`https://movieapi-rook.onrender.com/getmovies?${query}`);
        setData(res.data.paginated);
        setTotalMovies(res.data.size);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [filters, currentPage]); // Refetch when filters or currentPage changes

  const totalPages = Math.ceil(totalMovies / pageSize);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-[#020616] min-h-screen">
      {/* Filter Section */}
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Title Filter */}
          <input
            type="text"
            name="title"
            value={filters.title}
            onChange={handleFilterChange}
            placeholder="Search by title"
            className="p-2 rounded bg-gray-800 text-white"
          />

          {/* Year Range Filters */}
          <input
            type="number"
            name="minYear"
            value={filters.minYear}
            onChange={handleFilterChange}
            placeholder="Min Year"
            className="p-2 rounded bg-gray-800 text-white"
          />
          <input
            type="number"
            name="maxYear"
            value={filters.maxYear}
            onChange={handleFilterChange}
            placeholder="Max Year"
            className="p-2 rounded bg-gray-800 text-white"
          />

          {/* Rating Range Filters */}
          <input
            type="number"
            step="0.1"
            name="minRating"
            value={filters.minRating}
            onChange={handleFilterChange}
            placeholder="Min Rating"
            className="p-2 rounded bg-gray-800 text-white"
          />
          <input
            type="number"
            step="0.1"
            name="maxRating"
            value={filters.maxRating}
            onChange={handleFilterChange}
            placeholder="Max Rating"
            className="p-2 rounded bg-gray-800 text-white"
          />

          {/* Tags Filter */}
          <select
            name="tags"
            value={filters.tags}
            onChange={handleFilterChange}
            className="p-2 rounded bg-gray-800 text-white"
          >
            <option value="">Select Tags</option>
            {availableFilters.tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Movies Section */}
      <div className="flex flex-wrap gap-2 justify-center p-4">
        {data.map((movie: Movie) => (
          <Link key={movie.id} to={`/review/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 py-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-gray-800 text-white rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
          }`}
        >
          Previous
        </button>

        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-gray-800 text-white rounded ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
