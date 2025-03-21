using System;
using System.Collections.Generic;

namespace TicketBookingBackend.Models;

public partial class Show
{
    public int ShowId { get; set; }

    public int TheaterId { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime ShowDateTime { get; set; }

    public int Duration { get; set; }

    public decimal TicketPrice { get; set; }

    public string? ImageUrl { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual Theater Theater { get; set; } = null!;
}
