import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";
import Footer from "../components/Footer";
import { movies } from "../data/movies";

const Movies = () => {
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 border-b border-gray-800 pb-6">
          <h1 className="text-4xl font-bold text-red-600">Latest Movies</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300 cursor-pointer group"
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className="w-full h-64 bg-gray-800 flex items-center justify-center relative">
                <img 
                  src={movie.thumbnail} 
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-thumbnail.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-semibold">View Details</span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold line-clamp-1">{movie.title}</h3>
                <div className="flex justify-between text-gray-400 text-sm mt-2">
                  <span>{movie.year}</span>
                  <span>{movie.duration}</span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-yellow-500">★ {movie.rating}</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                    {movie.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Movies;