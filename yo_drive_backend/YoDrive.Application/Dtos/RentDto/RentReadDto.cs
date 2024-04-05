using System;
using YoDrive.Application.Dtos.CarDto;
using YoDrive.Application.Dtos.FeedbackDto;

namespace YoDrive.Application.Dtos.RentDto;

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