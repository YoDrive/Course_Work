using YoDrive.Domain.Models;

namespace YoDrive.Domain.Dtos.FeedbackDto;

public class FeedbackReadDto
{
    public int FeedbackId { get; set; }
    public int RentId { get; set; }
    public string Response { get; set; }
    public Byte Stars { get; set; }
    public DateTime FeedbackDate { get; set; }
}