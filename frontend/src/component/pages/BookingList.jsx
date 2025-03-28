// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getBookings, cancelBooking } from "../../api";

// const BookingList = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchBookings = async () => {
//       try {
//         const response = await getBookings(token);
//         setBookings(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching bookings:", err);
//         setError("Failed to load bookings. Please try again.");
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [navigate]);

//   const handleCancelBooking = async (bookingId) => {
//     const token = localStorage.getItem("token");
    
//     try {
//       await cancelBooking(token, bookingId);
      
//       // Update bookings list by removing the cancelled booking
//       setBookings(prevBookings => 
//         prevBookings.map(booking => 
//           booking.bookingId === bookingId 
//             ? { ...booking, status: "Cancelled" } 
//             : booking
//         )
//       );
//     } catch (err) {
//       console.error("Error cancelling booking:", err);
//       setError(err.response?.data?.message || "Failed to cancel booking.");
//     }
//   };

//   if (loading) return <div>Loading bookings...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="max-w-lg mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      
//       {bookings.length === 0 ? (
//         <div className="text-center text-gray-500">No bookings found</div>
//       ) : (
//         <div className="space-y-4">
//           {bookings.map((booking) => (
//             <div 
//               key={booking.bookingId} 
//               className={`
//                 p-4 rounded shadow-md
//                 ${booking.status === "Cancelled" ? 'bg-gray-100' : 'bg-white'}
//               `}
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h2 className="text-lg font-semibold">{booking.show.title}</h2>
//                   <p>
//                     <strong>Date:</strong> {new Date(booking.show.showDateTime).toLocaleDateString()}
//                   </p>
//                   <p>
//                     <strong>Status:</strong> {booking.status}
//                   </p>
//                 </div>
//                 {booking.status !== "Cancelled" && (
//                   <button
//                     onClick={() => handleCancelBooking(booking.bookingId)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingList;