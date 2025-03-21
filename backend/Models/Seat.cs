using System;
using System.Collections.Generic;

namespace TicketBookingBackend.Models;

public partial class Seat
{
    public int SeatId { get; set; }

    public int TheaterId { get; set; }

    public string SeatNumber { get; set; } = null!;

    public string SeatType { get; set; } = null!;

    public string? Status { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual Theater Theater { get; set; } = null!;
}
