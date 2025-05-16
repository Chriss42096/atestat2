import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movies } from '../data/movies';
import NavBar from '../components/navBar';
import Footer from '../components/Footer';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [afiseazaVideo, setAfiseazaVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const nrClickRamase = useRef(2);
  const ultimulClick = useRef(Date.now());
  const timerInactivitate = useRef(null);

  const reclame = [
    'https://www.888casino.ro/sem/bun-venit-88/?gclid=Cj0KCQjwxJvBBhDuARIsAGUgNfjxpN9nmoy2gW1NdzM_LEgzeKHCUNL-TSIQj1SaMzyQTcDmQ_IZ_hwaAtvHEALw_wcB&utm_campaign=20133608397_GGL_8Cas_RO_Gen_MDT_COMP_E_1735515&utm_content=145983616021_Competitors_Ex_[superbet]&utm_medium=cpc&utm_source=sem-generic_google&utm_term=superbet_superbet',
    'https://www.888casino.ro/sem/bun-venit-88/?gclid=Cj0KCQjwxJvBBhDuARIsAGUgNfjxpN9nmoy2gW1NdzM_LEgzeKHCUNL-TSIQj1SaMzyQTcDmQ_IZ_hwaAtvHEALw_wcB&utm_campaign=20133608397_GGL_8Cas_RO_Gen_MDT_COMP_E_1735515&utm_content=145983616021_Competitors_Ex_[superbet]&utm_medium=cpc&utm_source=sem-generic_google&utm_term=superbet_superbet',
    'https://www.888casino.ro/sem/bun-venit-88/?gclid=Cj0KCQjwxJvBBhDuARIsAGUgNfjxpN9nmoy2gW1NdzM_LEgzeKHCUNL-TSIQj1SaMzyQTcDmQ_IZ_hwaAtvHEALw_wcB&utm_campaign=20133608397_GGL_8Cas_RO_Gen_MDT_COMP_E_1735515&utm_content=145983616021_Competitors_Ex_[superbet]&utm_medium=cpc&utm_source=sem-generic_google&utm_term=superbet_superbet'
  ];

  useEffect(() => {
    const foundMovie = movies.find(m => m.id === parseInt(id));
    if (!foundMovie) navigate('/');
    setMovie(foundMovie);
    setRecommendations(
      movies.filter(m => m.category === foundMovie.category && m.id !== foundMovie.id).slice(0, 4)
    );
    return () => clearInterval(timerInactivitate.current);
  }, [id, navigate]);

  const afiseazaReclama = () => {
    const reclama = reclame[Math.floor(Math.random() * reclame.length)];
    window.open(reclama, '_blank');
    document.body.style.pointerEvents = 'none';
    setTimeout(() => document.body.style.pointerEvents = 'auto', 5000);
  };

  const handlePlayClick = () => {
    ultimulClick.current = Date.now();
    
    if (nrClickRamase.current > 0) {
      afiseazaReclama();
      nrClickRamase.current--;
    } else {
      setVideoError(true);
    }
  };

  const verificaInactivitate = () => {
    if (Date.now() - ultimulClick.current > 60000) {
      afiseazaReclama();
      ultimulClick.current = Date.now();
    }
  };

  useEffect(() => {
    timerInactivitate.current = setInterval(verificaInactivitate, 1000);
  }, []);

  const handleRetry = () => {
    nrClickRamase.current = 2;
    setVideoError(false);
    setAfiseazaVideo(true);
  };

  if (!movie) return null;
  console.log(movie.videoUrl);
  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          {videoError ? (
            <div className="bg-red-900/20 p-8 rounded-lg text-center">
              <p className="text-red-500 text-xl mb-4">⚠️ Video unavailable</p>
              <button 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
                onClick={handleRetry}
              >
                Retry
              </button>
            </div>
          ) : afiseazaVideo ? (
            <video
              controls
              autoPlay
              className="w-full rounded-lg"
              onError={() => setVideoError(true)}
            >
              <source src={movie.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div 
              className="relative group cursor-pointer aspect-video bg-gray-900 rounded-lg flex items-center justify-center"
              onClick={handlePlayClick}
            >
              <button className="text-6xl text-red-600 hover:text-red-700 transition-transform transform hover:scale-110">
                ▶
              </button>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-yellow-500">★ {movie.rating}</span>
            <span>{movie.year}</span>
            <span>{movie.duration}</span>
          </div>
          <p className="text-gray-300">{movie.description}</p>
        </div>

        {recommendations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">
              More {movie.category} Movies
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendations.map(recMovie => (
                <div 
                  key={recMovie.id} 
                  className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300 cursor-pointer"
                  onClick={() => navigate(`/movies/${recMovie.id}`)}
                >
                  <div className="w-full h-40 bg-gray-800 flex items-center justify-center">
                    <img 
                      src={recMovie.thumbnail} 
                      alt={recMovie.title}
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = "/placeholder-thumbnail.jpg"}
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-md font-semibold line-clamp-1">{recMovie.title}</h3>
                    <div className="flex justify-between text-gray-400 text-xs mt-1">
                      <span>{recMovie.year}</span>
                      <span className="text-yellow-500">★ {recMovie.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MovieDetails;