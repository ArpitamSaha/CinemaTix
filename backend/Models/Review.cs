using System;
using System.Collections.Generic;

namespace TicketBookingBackend.Models;

public partial class Review
{
    public int ReviewId { get; set; }

    public int UserId { get; set; }

    public int ShowId { get; set; }

    public int? Rating { get; set; }

    public string? Comment { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Show Show { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
