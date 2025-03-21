using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketBookingBackend.Models;

namespace TicketBookingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PaymentsController : ControllerBase
    {
        private readonly TicketBookingDatabaseContext _context;

        public PaymentsController(TicketBookingDatabaseContext context)
        {
            _context = context;
        }

        // POST: api/payments
        // Process payment for a booking.
        [HttpPost]
        public async Task<IActionResult> ProcessPayment([FromBody] Payment payment)
        {
            // In a real implementation, integrate with a payment gateway here.
            // For demo purposes, assume the payment is successful.
            payment.PaymentStatus = "Success";
            payment.PaymentDate = DateTime.UtcNow;

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Payment processed successfully.", PaymentId = payment.PaymentId });
        }
    }
}
