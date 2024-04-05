namespace YoDrive.Application.Dtos.CarDto;

public class CarMinDto
{
    public int CarId { get; set; }
    public string Name { get; set; }
    public string CarImage { get; set; }
    public byte[]? Image { get; set; }
}