import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/navBar';

const Home = () => {
  const navigate = useNavigate();

  const handleMoviesClick = () => navigate('/movies');
  const handleSeriesClick = () => navigate('/series');

  return (
    <div className="flex flex-col min-h-screen dark:bg-black">
      <NavBar />
      
      <main className="flex-grow">
        <section className="bg-white dark:bg-black transition-colors duration-300">
          <div className="max-w-screen-xl mx-auto px-4 py-24 lg:py-32 text-center">
            <div className="mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-8 animate-fade-in-down">
                Your Gateway to Unlimited Streaming
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                Dive into a vast library of top-rated movies and binge-worthy TV series.<br/>
                Enjoy seamless, high-quality streaming with StreamFlix — anytime, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                <button
                  onClick={handleMoviesClick}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all 
                    transform hover:scale-105 shadow-lg hover:shadow-red-600/30"
                >
                  Browse Movies
                </button>
                <button
                  onClick={handleSeriesClick}
                  className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-gray-600 
                    dark:border-gray-300 text-gray-800 dark:text-white px-8 py-4 rounded-full text-lg font-semibold 
                    transition-all transform hover:scale-105 shadow-sm dark:hover:shadow-gray-300/20"
                >
                  Browse TV Shows
                </button>
              </div>
            </div>

            <div className="mt-24 border-t border-gray-200 dark:border-gray-800 pt-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">About StreamFlix</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-7">
                  StreamFlix offers free streaming of over 10,000 movies and TV series with zero ads. 
                  Watch online instantly without registration or payments. Enjoy full HD quality and 
                  even download content to watch offline later.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800" />
    </div>
  );
};

export default Home;