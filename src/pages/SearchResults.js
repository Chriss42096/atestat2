import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";
import Footer from "../components/Footer";
import { movies } from "../data/movies";
import { series } from "../data/series";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q");
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [location.search]);

  const performSearch = (term) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    const lowerCaseTerm = term.toLowerCase();

    const movieResults = movies
      .filter(
        (movie) =>
          movie.title.toLowerCase().includes(lowerCaseTerm) ||
          movie.category.toLowerCase().includes(lowerCaseTerm)
      )
      .map((movie) => ({ ...movie, type: "movie" }));

    const seriesResults = series
      .filter(
        (show) =>
          show.title.toLowerCase().includes(lowerCaseTerm) ||
          show.category.toLowerCase().includes(lowerCaseTerm)
      )
      .map((show) => ({ ...show, type: "series" }));

    const combinedResults = [...movieResults, ...seriesResults];
    setResults(combinedResults);
    setFilteredResults(combinedResults);
  };

  const handleItemClick = (item) => {
    if (item.type === "movie") {
      navigate(`/movies/${item.id}`);
    } else {
      navigate(`/series/${item.id}`);
    }
  };

  const filterByType = (type) => {
    if (type === "all") {
      setFilteredResults(results);
    } else {
      setFilteredResults(results.filter((item) => item.type === type));
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 border-b border-gray-800 pb-6">
          <h1 className="text-4xl font-bold text-red-600">
            Search Results for "{searchTerm}"
          </h1>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => filterByType("all")}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
            >
              All ({results.length})
            </button>
            <button
              onClick={() => filterByType("movie")}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
            >
              Movies (
              {results.filter((item) => item.type === "movie").length})
            </button>
            <button
              onClick={() => filterByType("series")}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
            >
              TV Series (
              {results.filter((item) => item.type === "series").length})
            </button>
          </div>
        </div>

        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredResults.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300 cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-thumbnail.jpg";
                      }}
                    />
                  ) : (
                    <span className="text-gray-500">Thumbnail</span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex justify-between text-gray-400 text-sm mt-2">
                    <span>{item.year}</span>
                    <span>{item.duration || `${item.seasons} seasons`}</span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-yellow-500">★ {item.rating}</span>
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-red-400">
                    {item.type === "movie" ? "MOVIE" : "TV SERIES"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl text-gray-400">
              No results found for "{searchTerm}"
            </h3>
            <p className="text-gray-500 mt-2">
              Try different search terms or browse our collection
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;