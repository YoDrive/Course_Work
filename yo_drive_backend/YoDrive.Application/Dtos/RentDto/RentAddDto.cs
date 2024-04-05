using System;

namespace YoDrive.Application.Dtos.RentDto;

public class RentAddDto
{
    public int UserId { get; set; }
    public int CarId { get; set; }
    public DateTime StartDate {get; set; }
    public DateTime EndDate {get; set; }
    public decimal RentCost { get; set; }
}