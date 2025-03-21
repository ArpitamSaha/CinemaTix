using System;
using System.Collections.Generic;

namespace TicketBookingBackend.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int BookingId { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public string? PaymentStatus { get; set; }

    public decimal AmountPaid { get; set; }

    public string TransactionId { get; set; } = null!;

    public DateTime? PaymentDate { get; set; }

    public virtual Booking Booking { get; set; } = null!;
}
