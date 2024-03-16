using YoDrive.Domain.AuthDto;
using YoDrive.Domain.Dtos.CarDto;
using YoDrive.Domain.Dtos.FeedbackDto;
using YoDrive.Domain.Models;

namespace YoDrive.Domain.Dtos.RentDto;

public class RentReadDto
{
    public int RentId { get; set; }
    public int UserId { get; set; }
    public CarReadDto Car { get; set; }
    public DateTime StartDate {get; set; }
    public DateTime EndDate {get; set; }
    public decimal RentCost { get; set; }
    public FeedbackReadDto? Feedback { get; set; }
}