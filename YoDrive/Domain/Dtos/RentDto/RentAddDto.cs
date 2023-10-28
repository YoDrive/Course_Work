namespace YoDrive.Domain.Dtos.RentDto;

public class RentAddDto
{
    public int UserId { get; set; }
    public int CarId { get; set; }
    public DateTime StartDate {get; set; }
    public DateTime EndDate {get; set; }
    public decimal RentCost { get; set; }
    public bool IsDeleted { get; set; }
}