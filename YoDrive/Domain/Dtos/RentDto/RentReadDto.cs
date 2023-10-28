using YoDrive.Domain.Models;

namespace YoDrive.Domain.Dtos.RentDto;

public class RentReadDto
{
    public int RentId { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public int CarId { get; set; }
    public Car Car { get; set; }
    public DateTime StartDate {get; set; }
    public DateTime EndDate {get; set; }
    public decimal RentCost { get; set; }
    public bool IsDeleted { get; set; }
    public Feedback? Feedback { get; set; }
}