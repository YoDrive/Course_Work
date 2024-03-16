namespace YoDrive.Domain.Dtos.RentDto;

public class RentUpdateDto
{
    public int RentId { get; set; }
    public int UserId { get; set; }
    public int CarId { get; set; }
    public DateTime StartDate {get; set; }
    public DateTime EndDate {get; set; }
    public decimal RentCost { get; set; }
}