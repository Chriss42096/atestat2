import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 p-5 text-sm">
      <div className="max-w-6xl mx-auto">
        <div className="mb-5">
          <p>
            StreamFlix is a Free Movies streaming site with zero ads. We let you watch movies online 
            without having to register or paying, with over 10000 movies and TV Series. You can also 
            Download full movies from StreamFlix and watch it later if you want.
          </p>
        </div>

      
        <div className="border-t border-gray-700 my-4"></div>

        <div className="text-center">
          <p className="mb-2">© StreamFlix</p>
          <div className="flex justify-center space-x-4 mb-2">
            <a href="#" className="text-red-500 hover:underline">Android App</a>
            <a href="#" className="text-red-500 hover:underline">Terms of service</a>
            <a href="#" className="text-red-500 hover:underline">Contact</a>
            <a href="#" className="text-red-500 hover:underline">Sitemap</a>
            <a href="#" className="text-red-500 hover:underline">FAQ</a>
          </div>
          <p className="text-gray-500 text-xs">
            StreamFlix  does not store any files on our server, we only intend to be made which is hosted on 3rd party services.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;