import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";
import Footer from "../components/Footer";
import { series } from "../data/series";

const Series = () => {
  const navigate = useNavigate();

  const handleSeriesClick = (seriesId) => {
    navigate(`/series/${seriesId}`);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="mb-8 border-b border-gray-800 pb-6">
          <h1 className="text-4xl font-bold text-red-600">TV Series</h1>
        </div>

        {/* Series Grid - 5 pe rând */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {series.map((seriesItem) => (
            <div 
              key={seriesItem.id} 
              className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300 cursor-pointer"
              onClick={() => handleSeriesClick(seriesItem.id)}
            >
              {/* Thumbnail */}
              <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
                {seriesItem.thumbnail ? (
                  <img 
                    src={seriesItem.thumbnail} 
                    alt={seriesItem.title}
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
              
              {/* Series Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold line-clamp-1">{seriesItem.title}</h3>
                <div className="flex justify-between text-gray-400 text-sm mt-2">
                  <span>{seriesItem.year}</span>
                  <span>S{seriesItem.seasons}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-yellow-500">★ {seriesItem.rating}</span>
                </div>
                <div className="mt-2">
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                    {seriesItem.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Series;