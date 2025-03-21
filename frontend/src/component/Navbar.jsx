import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSignOutAlt, 
  faUserPlus, 
  faHome, 
  faQuestionCircle,
  faUserCog,
  faShoppingBag,
  faBars,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/logo2.png";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const handleLogout = async () => {
    try {
     
      // Clear all relevant storage
      localStorage.removeItem("user");
      
      // Remove any auth tokens
      localStorage.removeItem("token"); // If you're using a token-based auth
      
      // Reset user state
      setUser(null);
      
      // Optional: Show a logout success message
      toast.success("Logged out successfully"); // If using a toast library
      
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const sideNavItems = [
    { name: "Your Orders", icon: faShoppingBag, action: () => navigate("/orders") },
    { name: "Help & Support", icon: faQuestionCircle, action: () => navigate("/support") },
    { name: "Account Settings", icon: faUserCog, action: () => navigate("/settings") },
  ];

  return (
    <>
      <nav className="bg-white flex justify-between items-center px-4 md:px-8 py-3 shadow-md border-b border-gray-200 sticky top-0 z-10">
        {/* Logo Section */}
        <div className="flex items-center">
          <img 
            src={Logo} 
            alt="Brand Logo" 
            className="h-10 cursor-pointer transition-all duration-200 hover:opacity-80" 
            onClick={() => navigate("/")} 
          />
        </div>

        {/* Right Section: Login Button & Side Nav Toggle */}
        <div className="flex items-center space-x-4">
          {/* Login Button */}
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center px-5 py-2 rounded-lg bg-[#005792] text-white hover:bg-[#004d80] transition-all duration-300 shadow-sm"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Sign In
            </button>
          ) : (
            <span className="hidden md:block font-medium text-gray-700">
              {user.firstName}
            </span>
          )}

          {/* Side Nav Toggle Button */}
          <button
            onClick={() => setIsSideNavOpen(!isSideNavOpen)}
            className="flex items-center justify-center h-10 w-10 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle side navigation"
          >
            <FontAwesomeIcon icon={faBars} className="text-lg" />
          </button>
        </div>
      </nav>

      {/* Side Navigation - Fixed to right side */}
      <div 
        className={`fixed top-0 right-0 w-72 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isSideNavOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Side Nav Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          <button
            onClick={() => setIsSideNavOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="text-gray-600" />
          </button>
        </div>

        {/* User Info (if logged in) */}
        {user && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-lg">
                  {user.firstName ? user.firstName[0].toUpperCase() : user.emailId ? user.emailId[0].toUpperCase() : "U"}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {user.firstName || "User"}
                </p>
                <p className="text-sm text-gray-500">{user.emailId}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div className="p-4">
          <button
            onClick={() => {
              navigate("/");
              setIsSideNavOpen(false);
            }}
            className="w-full px-4 py-3 rounded-lg flex items-center text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FontAwesomeIcon icon={faHome} className="mr-3 text-blue-600" />
            Home
          </button>

          {user && (
            <>
              {sideNavItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.action();
                    setIsSideNavOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-lg flex items-center text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FontAwesomeIcon icon={item.icon} className="mr-3 text-blue-600" />
                  {item.name}
                </button>
              ))}

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="w-full px-4 py-3 rounded-lg flex items-center text-red-600 hover:bg-red-50 font-medium transition-colors"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Transparent Overlay for closing sidebar */}
      {isSideNavOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsSideNavOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;