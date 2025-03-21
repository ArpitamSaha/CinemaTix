using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TicketBookingBackend.Models;

namespace TicketBookingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Only authenticated users can book tickets.
    public class BookingsController : ControllerBase
    {
        private readonly TicketBookingDatabaseContext _context;

        public BookingsController(TicketBookingDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/bookings
        // Gets bookings for the currently logged in user.
        [HttpGet]
        public async Task<IActionResult> GetUserBookings()
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var bookings = await _context.Bookings
                .Include(b => b.Show)
                .Where(b => b.UserId == userId)
                .ToListAsync();
            return Ok(bookings);
        }

        // POST: api/bookings
        // Create a new booking.
        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] Booking booking)
        {
            // Associate booking with the authenticated user.
            booking.UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            // You can add additional logic here for seat validation etc.
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUserBookings), new { id = booking.BookingId }, booking);
        }

        // PUT: api/bookings/{id}/cancel
        // Allows a user to cancel a booking.
        [HttpPut("{id}/cancel")]
        public async Task<IActionResult> CancelBooking(int id)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var booking = await _context.Bookings.FirstOrDefaultAsync(b => b.BookingId == id && b.UserId == userId);
            if (booking == null)
                return NotFound();

            booking.Status = "Cancelled";
            _context.Entry(booking).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
