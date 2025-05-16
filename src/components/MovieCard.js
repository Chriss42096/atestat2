import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300">
        <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
          {movie.thumbnail ? (
            <img 
              src={movie.thumbnail} 
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">Thumbnail</span>
          )}
        </div>
        
        <div className="p-3">
          <h3 className="text-md font-semibold line-clamp-1">{movie.title}</h3>
          <div className="flex justify-between text-gray-400 text-xs mt-1">
            <span>{movie.year}</span>
            <span className="text-yellow-500">★ {movie.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;