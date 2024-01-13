using YoDrive.Domain.Enums;

namespace YoDrive.Domain.Dtos.CarDto;

public class CarUpdateDto
{
    public int CarId { get; set; }
    public int ModelId { get; set; }
    public int ClassId { get; set; }
    public int FilialId { get; set; }
    public int Year { get; set; }
    public GearBox GearBox { get; set; }
    public decimal CostDay { get; set; }
    public IFormFile? CarImage { get; set; }
}