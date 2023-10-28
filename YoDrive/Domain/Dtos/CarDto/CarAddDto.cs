using YoDrive.Domain.Enums;

namespace YoDrive.Domain.Dtos.CarDto;

public class CarAddDto
{
    public int ModelId { get; set; }
    public int ClassId { get; set; }
    public int FilialId { get; set; }
    public string StateNumber { get; set; }
    public GearBox GearBox { get; set; }
    public decimal CostDay { get; set; }
    public string? CarImage { get; set; }
}