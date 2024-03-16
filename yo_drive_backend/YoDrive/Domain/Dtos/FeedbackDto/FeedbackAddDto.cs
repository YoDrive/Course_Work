namespace YoDrive.Domain.Dtos.FeedbackDto;

public class FeedbackAddDto
{
    public int RentId { get; set; }
    public string Response { get; set; }
    public Byte Stars { get; set; }
    public DateTime FeedbackDate { get; set; }
}