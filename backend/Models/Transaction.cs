using System;
using System.Collections.Generic;

namespace TicketBookingBackend.Models;

public partial class Transaction
{
    public string TransactionId { get; set; } = null!;

    public int UserId { get; set; }

    public int BookingId { get; set; }

    public decimal Amount { get; set; }

    public string Status { get; set; } = null!;

    public DateTime? TransactionDate { get; set; }

    public virtual Booking Booking { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
