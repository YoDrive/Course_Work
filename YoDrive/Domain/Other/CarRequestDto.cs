namespace YoDrive.Domain.Other;

public class CarRequestDto
{
    public Page Page { get; set; }
    public Filter Filter { get; set; }
    public Sort? Sort { get; set; }
}