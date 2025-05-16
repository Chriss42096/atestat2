import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { series } from '../data/series';
import NavBar from '../components/navBar';
import Footer from '../components/Footer';
import VideoPlayer from '../components/VideoPlayer';

const SeriesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSeries, setCurrentSeries] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(0);

  useEffect(() => {
    const foundSeries = series.find(s => s.id === parseInt(id));
    if (!foundSeries) {
      navigate('/');
      return;
    }
    
    setCurrentSeries(foundSeries);
    setRecommendations(
      series.filter(s => s.category === foundSeries.category && s.id !== foundSeries.id)
    );
    setSelectedSeason(1);
    setSelectedEpisode(0);
  }, [id, navigate]);

  const groupEpisodesBySeason = () => {
    if (!currentSeries?.episodes) return [];
    
    const episodesPerSeason = Math.ceil(currentSeries.episodes.length / currentSeries.seasons);
    const seasons = [];
    
    for (let i = 0; i < currentSeries.seasons; i++) {
      seasons.push({
        season: i + 1,
        episodes: currentSeries.episodes.slice(i * episodesPerSeason, (i + 1) * episodesPerSeason)
      });
    }
    
    return seasons;
  };

  const seasons = groupEpisodesBySeason();
  const currentEpisodes = seasons.find(s => s.season === selectedSeason)?.episodes || [];
  const videoUrl = currentSeries 
    ? `/videos/${currentSeries.title.toLowerCase().replace(/ /g, '-')}/s${selectedSeason}e${selectedEpisode + 1}.mp4`
    : '';

  if (!currentSeries) return null;

  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />

      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Video Player */}
        <div className="mb-8">
          <VideoPlayer 
            src={videoUrl}
            autoPlay={false}
            showControls={true}
          />
        </div>

        {/* Series Info */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{currentSeries.title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-yellow-500">★ {currentSeries.rating}</span>
            <span>{currentSeries.year}</span>
            <span>{currentSeries.seasons} seasons</span>
          </div>
          <p className="text-gray-300">{currentSeries.description}</p>
        </div>

        {/* Season Selector */}
        <div className="mb-6 bg-gray-900 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Seasons</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: currentSeries.seasons }, (_, i) => i + 1).map(season => (
              <button
                key={season}
                onClick={() => {
                  setSelectedSeason(season);
                  setSelectedEpisode(0);
                }}
                className={`px-4 py-2 rounded-full ${
                  selectedSeason === season
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Season {season}
              </button>
            ))}
          </div>
        </div>

        {/* Episode Selector */}
        <div className="mb-8 bg-gray-900 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Episodes - Season {selectedSeason}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {currentEpisodes.map((episode, index) => (
              <button
                key={episode.id}
                onClick={() => setSelectedEpisode(index)}
                className={`p-3 text-left rounded-lg ${
                  selectedEpisode === index
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="font-semibold">Episode {index + 1}</div>
                <div className="text-sm opacity-75">{episode.title}</div>
                <div className="text-xs opacity-50 mt-1">{episode.duration}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">More {currentSeries.category} Series</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendations.map(series => (
                <div 
                  key={series.id} 
                  className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => navigate(`/series/${series.id}`)}
                >
                  <div className="h-48 bg-gray-800 flex items-center justify-center">
                    {series.thumbnail ? (
                      <img 
                        src={series.thumbnail} 
                        alt={series.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/placeholder-thumbnail.jpg";
                        }}
                      />
                    ) : (
                      <span className="text-gray-500">No thumbnail</span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold truncate">{series.title}</h3>
                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                      <span>{series.year}</span>
                      <span>★ {series.rating}</span>
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

export default SeriesDetails;