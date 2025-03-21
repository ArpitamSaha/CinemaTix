using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketBookingBackend.Models;

namespace TicketBookingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowsController : ControllerBase
    {
        private readonly TicketBookingDatabaseContext _context;

        public ShowsController(TicketBookingDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/shows
        [HttpGet]
        public async Task<IActionResult> GetShows()
        {
            var shows = await _context.Shows.ToListAsync();
            return Ok(shows);
        }

        // GET: api/shows/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetShow(int id)
        {
            var show = await _context.Shows.FindAsync(id);
            if (show == null)
                return NotFound();

            return Ok(show);
        }

        // POST: api/shows
        // Admin-only endpoint for adding shows.
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateShow([FromBody] Show show)
        {
            _context.Shows.Add(show);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetShow), new { id = show.ShowId }, show);
        }

        // PUT: api/shows/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateShow(int id, [FromBody] Show show)
        {
            if (id != show.ShowId)
                return BadRequest();

            _context.Entry(show).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShowExists(id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        // DELETE: api/shows/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteShow(int id)
        {
            var show = await _context.Shows.FindAsync(id);
            if (show == null)
                return NotFound();

            _context.Shows.Remove(show);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool ShowExists(int id)
        {
            return _context.Shows.Any(s => s.ShowId == id);
        }
    }
}
