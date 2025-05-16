import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { movies, movieCategories } from "../data/movies";
import { series, seriesCategories } from "../data/series";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleSearch = (term) => {
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const lowerCaseTerm = term.toLowerCase();
    
    const movieResults = movies.filter(movie => 
      movie.title.toLowerCase().includes(lowerCaseTerm) ||
      movie.category.toLowerCase().includes(lowerCaseTerm))
      .map(movie => ({ ...movie, type: 'movie' }));
    
    const seriesResults = series.filter(show => 
      show.title.toLowerCase().includes(lowerCaseTerm) ||
      show.category.toLowerCase().includes(lowerCaseTerm))
      .map(show => ({ ...show, type: 'series' }));
    
    const combinedResults = [...movieResults, ...seriesResults];
    
    setSearchResults(combinedResults);
    setShowResults(combinedResults.length > 0);
  };

  const handleResultClick = (result) => {
    navigate(`/${result.type}s/${result.id}`);
    setSearchTerm("");
    setSearchResults([]);
    setShowResults(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setSearchResults([]);
      setShowResults(false);
    }
  };

  return (
    <nav className="bg-black text-white p-4 shadow-md relative">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/logodog.png" 
            className="h-10 mr-3" 
            alt="StreamFlux Logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder-logo.png";
            }}
          />
          <span className="text-2xl font-bold">StreamFlix</span>
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link 
            to="/" 
            className={`${isActive('/') ? 'text-red-500' : 'hover:text-red-400'}`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`${isActive('/about') ? 'text-red-500' : 'hover:text-red-400'}`}
          >
            About
          </Link>
          <Link 
            to="/movies" 
            className={`${isActive('/movies') ? 'text-red-500' : 'hover:text-red-400'}`}
          >
            Movies
          </Link>
          <Link 
            to="/series" 
            className={`${isActive('/series') ? 'text-red-500' : 'hover:text-red-400'}`}
          >
            TV Series
          </Link>
        </div>

        <div className="hidden md:block relative">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search movies or series..."
              className="px-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
            />
          </form>
          
          {showResults && (
            <div className="absolute top-full left-0 right-0 bg-gray-800 rounded-lg shadow-lg mt-1 z-50 max-h-96 overflow-y-auto">
              {searchResults.map((result) => (
                <div
                  key={`${result.type}-${result.id}`}
                  className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700 flex items-center"
                  onClick={() => handleResultClick(result)}
                >
                  <img 
                    src={result.thumbnail} 
                    alt={result.title}
                    className="w-10 h-10 object-cover rounded mr-3"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-thumbnail.jpg";
                    }}
                  />
                  <div>
                    <div className="font-medium">{result.title}</div>
                    <div className="text-sm text-gray-400">
                      {result.type === 'movie' ? 'Movie' : 'TV Series'} • {result.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;