namespace YoDrive.Domain.Dtos.FeedbackDto;

public class FeedbackUpdateDto
{
    public int FeedbackId { get; set; }
    public string Response { get; set; }
    public Byte Stars { get; set; }
}