import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom"; 
import { 
  faStar, 
  faTicket, 
  faFilm, 
  faCalendar, 
  faFireAlt 
} from "@fortawesome/free-solid-svg-icons";

// API Endpoints with full base URL
const BASE_URL = 'https://localhost:7060/api/';
const SHOWS_API_URL = `${BASE_URL}shows`;

const Home = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Now Playing");

  // Movie categories
  const categories = [
    "Now Playing", 
    "Coming Soon", 
    "Top Rated", 
    "Trending"
  ];

  // Fetch shows using axios
  const fetchShows = async () => {
    try {
      const response = await axios.get(SHOWS_API_URL);
      
      // Transform the response to match the expected movie structure
      const transformedMovies = response.data.map(show => ({
        id: show.showId,
        title: show.title,
        description: show.description,
        imageUrl: `/placeholders/movie-${show.showId % 5 + 1}.jpg`, // Placeholder image logic
        rating: Math.floor(Math.random() * 5) + 1, // Random rating for demonstration
        status: new Date(show.showDateTime) > new Date() ? "Coming Soon" : "Now Playing",
        releaseDate: new Date(show.showDateTime).toLocaleDateString(),
        trending: Math.random() > 0.5 // Random trending flag
      }));

      setMovies(transformedMovies);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  // Auto-rotate hero section
  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        setHeroIndex((prevIndex) => (prevIndex + 1) % movies.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [movies]);

  // Fetch shows on component mount
  useEffect(() => {
    fetchShows();
  }, []);

  const handleBookTicket = (movie) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to book a ticket.");
      return;
    }

    navigate(`/booking/${movie.id}?title=${encodeURIComponent(movie.title)}`);
  };

  // Filter movies based on active category
  const filteredMovies = movies.filter(movie => {
    switch(activeCategory) {
      case "Now Playing":
        return movie.status === "Now Playing";
      case "Coming Soon":
        return movie.status === "Coming Soon";
      case "Top Rated":
        return movie.rating >= 4;
      case "Trending":
        return movie.trending;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[600px] md:h-screen max-h-[800px] overflow-hidden">
        <AnimatePresence mode="wait">
          {movies.length > 0 ? (
            <motion.div
              key={heroIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Blurred Background */}
              <div
                className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-40"
                style={{ backgroundImage: `url(${movies[heroIndex]?.imageUrl})` }}
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-blue-900/60" />

              {/* Content */}
              <div className="relative z-10 container mx-auto px-6 md:px-16 lg:px-24 h-full flex items-center">
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <div className="flex items-center mb-4">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full mr-4 text-sm flex items-center">
                        <FontAwesomeIcon icon={faFireAlt} className="mr-2" />
                        {movies[heroIndex]?.trending ? "Trending" : "Featured"}
                      </span>
                      <div className="flex items-center text-yellow-400">
                        <FontAwesomeIcon icon={faStar} className="mr-2" />
                        <span className="font-bold">{movies[heroIndex]?.rating || "N/A"}</span>
                      </div>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                      {movies[heroIndex]?.title}
                    </h1>

                    <p className="text-gray-300 text-lg mb-8">
                      {movies[heroIndex]?.description || "An exciting new movie experience awaits!"}
                    </p>

                    <div className="flex space-x-4">
                      <motion.button
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBookTicket(movies[heroIndex])}
                      >
                        <FontAwesomeIcon icon={faTicket} className="mr-2" />
                        Book Tickets
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-white text-xl">Loading movies...</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Movie Categories and Listings */}
      <div className="container mx-auto px-6 md:px-16 lg:px-24 mt-12">
        {/* Category Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`
                px-6 py-2 rounded-full transition-all duration-300 flex items-center
                ${activeCategory === category 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }
              `}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <motion.div 
              key={movie.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <img 
                  src={movie.imageUrl} 
                  alt={movie.title} 
                  className="w-full h-96 object-cover group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute top-4 right-4 bg-yellow-500 text-black px-2 py-1 rounded flex items-center">
                  <FontAwesomeIcon icon={faStar} className="mr-1" />
                  {movie.rating}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 truncate">{movie.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400 flex items-center">
                    <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                    {movie.releaseDate}
                  </span>
                  <motion.button 
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleBookTicket(movie)}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;