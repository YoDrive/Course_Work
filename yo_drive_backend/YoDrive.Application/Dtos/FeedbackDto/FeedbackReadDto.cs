using System;

namespace YoDrive.Application.Dtos.FeedbackDto;

public class FeedbackReadDto
{
    public string UserName { get; set; }
    public int FeedbackId { get; set; }
    public int RentId { get; set; }
    public string Response { get; set; }
    public Byte Stars { get; set; }
    public DateTime FeedbackDate { get; set; }
}