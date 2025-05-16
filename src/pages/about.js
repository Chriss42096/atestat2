import React from 'react'
import NavBar from '../components/navBar';
import Footer from '../components/Footer';

export const about = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <div className="py-20 px-4 text-center border-b border-gray-800">
        <h1 className="text-5xl font-bold mb-4 text-red-600">ABOUT STREAMFLIX</h1>
        <div className="w-24 h-1 bg-red-600 mx-auto"></div>
      </div>

      {/* Mission Section */}
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-red-500">Our Mission</h2>
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            At <span className="text-red-500">StreamFlix</span>, we're revolutionizing how you experience entertainment. 
            Our platform delivers unlimited access to thousands of movies and TV shows, 
            curated just for you.
          </p>
          <p>
            We believe in <span className="text-red-500">quality streaming</span>, personalized recommendations, 
            and an <span className="text-red-500">ad-free experience</span> that puts viewers first.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-black py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-red-500">Why Choose StreamFlix?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Massive Library',
                description: '10,000+ movies and TV shows across all genres',
                icon: '🎬'
              },
              {
                title: 'Smart Search',
                description: 'Find exactly what you want with our powerful filters',
                icon: '🔍'
              },
              {
                title: 'Watch Anywhere',
                description: 'Available on all your devices, anytime',
                icon: '📱'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-black p-6 rounded-lg border border-gray-800 hover:border-red-500 transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-red-500">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
export default about