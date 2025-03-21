import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faStar, 
  faCalendarAlt,
  faPlayCircle,
  faEnvelope,
  faPhone,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faYoutube 
} from "@fortawesome/free-brands-svg-icons";
import Navbar from "../Navbar";

// Mock data - in a real app this would come from an API
const featuredMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    poster: "/api/placeholder/300/450",
    rating: 4.7,
    genres: ["Sci-Fi", "Adventure"],
    releaseDate: "March 1, 2025"
  },
  {
    id: 2,
    title: "The Batman Returns",
    poster: "/api/placeholder/300/450",
    rating: 4.5,
    genres: ["Action", "Drama", "Crime"],
    releaseDate: "April 12, 2025"
  },
  {
    id: 3,
    title: "Oppenheimer",
    poster: "/api/placeholder/300/450",
    rating: 4.8,
    genres: ["Biography", "Drama", "History"],
    releaseDate: "February 15, 2025"
  },
  {
    id: 4,
    title: "Avatar 3",
    poster: "/api/placeholder/300/450",
    rating: 4.6,
    genres: ["Action", "Adventure", "Fantasy"],
    releaseDate: "May 5, 2025"
  }
];

const upcomingMovies = [
  {
    id: 5,
    title: "Mission Impossible 8",
    poster: "/api/placeholder/300/450",
    releaseDate: "July 2025"
  },
  {
    id: 6,
    title: "John Wick 5",
    poster: "/api/placeholder/300/450",
    releaseDate: "June 2025"
  },
  {
    id: 7,
    title: "Black Panther 3",
    poster: "/api/placeholder/300/450",
    releaseDate: "August 2025"
  }
];

const Home = ({ user, setUser }) => {
  const [heroIndex, setHeroIndex] = useState(0);
  
  // Auto-rotate hero banner
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prevIndex) => (prevIndex + 1) % featuredMovies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar user={user} setUser={setUser} />
      
      {/* Hero Section */}
      <div className="relative h-96 md:h-screen max-h-[700px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Background image overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40" 
              style={{ backgroundImage: `url(${featuredMovies[heroIndex].poster})` }}
            />
            
            {/* Content */}
            <div className="relative h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 z-10">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                  {featuredMovies[heroIndex].title}
                </h1>
                <div className="flex items-center mb-6">
                  <div className="bg-yellow-500 text-black font-bold px-3 py-1 rounded flex items-center mr-4">
                    <FontAwesomeIcon icon={faStar} className="mr-1" />
                    {featuredMovies[heroIndex].rating}
                  </div>
                  <div className="text-white flex space-x-2">
                    {featuredMovies[heroIndex].genres.map((genre, i) => (
                      <span key={i} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-white/80 text-lg mb-8">
                  In theaters {featuredMovies[heroIndex].releaseDate}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {/* Book ticket logic */}}
                  >
                    Book Tickets
                  </motion.button>
                  
                  {/* <motion.button
                    className="px-8 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-lg font-medium flex items-center shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowTrailer(true)}
                  >
                    <FontAwesomeIcon icon={faPlayCircle} className="mr-2" />
                    Watch Trailer
                  </motion.button> */}
                </div>
              </motion.div>
            </div>
            
            {/* Dots indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {featuredMovies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setHeroIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === heroIndex ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Now Playing Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-16 mx-6 md:mx-16 lg:mx-24"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Now Playing</h2>
          <button className="text-blue-600 font-medium hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredMovies.map((movie) => (
            <motion.div
              key={movie.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover" />
                <div className="absolute top-0 right-0 m-3 bg-yellow-500 text-black font-bold px-2 py-1 rounded flex items-center text-sm">
                  <FontAwesomeIcon icon={faStar} className="mr-1" />
                  {movie.rating}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 text-gray-800 line-clamp-1">{movie.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{movie.genres.join(", ")}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg"
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Coming Soon Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 mx-6 md:mx-16 lg:mx-24 pb-16"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Coming Soon</h2>
          <button className="text-blue-600 font-medium hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {upcomingMovies.map((movie) => (
            <motion.div
              key={movie.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative group"
            >
              <div className="relative h-72">
                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-white mb-2" />
                  <p className="text-white font-medium">{movie.releaseDate}</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 text-gray-800">{movie.title}</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 rounded-lg mt-2"
                >
                  Set Reminder
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-auto bg-gray-900 text-white"
      >
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Column 1: About */}
              <div>
                <h4 className="font-bold text-lg mb-4">About CinemaTix</h4>
                <p className="text-gray-400 mb-4">
                  Your premier destination for booking movie tickets, shows, and events with convenience and style.
                </p>
                <div className="flex space-x-4">
                  <motion.a 
                    href="#" 
                    whileHover={{ y: -3 }}
                    className="bg-blue-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    whileHover={{ y: -3 }}
                    className="bg-blue-400 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    whileHover={{ y: -3 }}
                    className="bg-pink-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    whileHover={{ y: -3 }}
                    className="bg-red-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                  >
                    <FontAwesomeIcon icon={faYoutube} />
                  </motion.a>
                </div>
              </div>
              
              {/* Column 2: Quick Links */}
              <div>
                <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Movies</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Theaters</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Events</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gift Cards</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Offers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Membership</a></li>
                </ul>
              </div>
              
              {/* Column 3: Help & Support */}
              <div>
                <h4 className="font-bold text-lg mb-4">Help & Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Refund Policy</a></li>
                </ul>
              </div>
              
              {/* Column 4: Contact Info */}
              <div>
                <h4 className="font-bold text-lg mb-4">Contact Us</h4>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 mt-1 mr-3" />
                    <span className="text-gray-400">
                      123 Cinema Street, Movie District<br />
                      Los Angeles, CA 90001
                    </span>
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon icon={faPhone} className="text-green-500 mr-3" />
                    <a href="tel:+18001234567" className="text-gray-400 hover:text-white transition-colors">
                      +1 (800) 123-4567
                    </a>
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon icon={faEnvelope} className="text-blue-400 mr-3" />
                    <a href="mailto:info@cinematix.com" className="text-gray-400 hover:text-white transition-colors">
                      info@cinematix.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Download App Section */}
            <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h4 className="font-bold text-lg mb-2">Download Our App</h4>
                <p className="text-gray-400">Get the best experience on your smartphone</p>
              </div>
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.05 }}
                  className="block"
                >
                  <img src="/api/placeholder/140/42" alt="App Store" className="h-12" />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.05 }}
                  className="block"
                >
                  <img src="/api/placeholder/140/42" alt="Google Play" className="h-12" />
                </motion.a>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
              <p>© 2025 CinemaTix. All rights reserved.</p>
            </div>
          </div>
        </div>
      </motion.footer>
      
      {/* Trailer Modal */}
      
    </div>
  );
};

export default Home;