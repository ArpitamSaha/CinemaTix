// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Navbar from "./component/Navbar";
// import Home from "./component/pages/Home";
// import Login from "./component/pages/Login";
// import Register from "./component/pages/Register";
// import BookingList from "./component/pages/BookingList";
// // import Orders from "./component/pages/Orders";
// // import Support from "./component/pages/Support";
// // import Settings from "./component/pages/Settings";
// import BookingForm from "./component/pages/BookingForm";
// import "./App.css";
// import Footer from "./component/Footer";

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check if user is logged in from localStorage on component mount
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//         localStorage.removeItem("user");
//       }
//     }
//   }, []);

//   return (
//     <Router>
//       <Navbar user={user} setUser={setUser} />
//       <Routes>
//         <Route path="/" element={<Home user={user} setUser={setUser} />} />
//         <Route path="/login" element={<Login setUser={setUser} />} />
//         <Route path="/register" element={<Register setUser={setUser} />} />
//         <Route path="/bookings" element={<BookingList user={user} />} />
//         <Route path="/booking/id" element={<BookingForm user={user} />} />
//         {/* <Route path="/orders" element={<Orders user={user} />} />
//         <Route path="/support" element={<Support user={user} />} />
//         <Route path="/settings" element={<Settings user={user} setUser={setUser} />} /> */}
//       </Routes>
//       <Footer/>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import Home from "./component/pages/Home";
import Login from "./component/pages/Login";
import Register from "./component/pages/Register";
// import BookingList from "./component/pages/BookingList";
// import Orders from "./component/pages/Orders";
// import Support from "./component/pages/Support";
// import Settings from "./component/pages/Settings";
import BookingForm from "./component/pages/BookingForm";
import "./App.css";
import Footer from "./component/Footer";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in from localStorage on component mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        {/* <Route path="/bookings" element={<BookingList user={user} />} /> */}
        {/* Updated route: use "/booking" so that query params like ?id=... are accessible */}
        <Route path="/booking" element={<BookingForm user={user} />} />
        {/* <Route path="/orders" element={<Orders user={user} />} />
        <Route path="/support" element={<Support user={user} />} />
        <Route path="/settings" element={<Settings user={user} setUser={setUser} />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;