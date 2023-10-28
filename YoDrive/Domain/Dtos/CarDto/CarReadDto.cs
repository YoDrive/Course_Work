using YoDrive.Domain.Enums;
using YoDrive.Domain.Models;

namespace YoDrive.Domain.Dtos.CarDto;

public class CarReadDto
{
    public int CarId { get; set; }
    public int ModelId { get; set; }
    public CarModel CarModel { get; set; }
    public int ClassId { get; set; }
    public CarClass CarClass { get; set; }
    public int FilialId { get; set; }
    public Filial Filial { get; set; }
    public string StateNumber { get; set; }
    public GearBox GearBox { get; set; }
    public decimal CostDay { get; set; }
    public string? CarImage { get; set; }
    public bool IsDeleted { get; set; }
    public ICollection<Rent>? Rents { get; set; }
}