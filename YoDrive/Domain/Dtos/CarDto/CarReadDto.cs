using YoDrive.Domain.Dtos.CarClassDto;
using YoDrive.Domain.Dtos.FilialDto;
using YoDrive.Domain.Dtos.ModelDto;
using YoDrive.Domain.Enums;

namespace YoDrive.Domain.Dtos.CarDto;

public class CarReadDto
{
    public int CarId { get; set; }
    public int ModelId { get; set; }
    public CarModelReadDto CarModel { get; set; }
    public ClassReadDto CarClass { get; set; }
    public FilialReadDto Filial { get; set; }
    public int Year { get; set; }
    public string StateNumber { get; set; }
    public GearBox GearBox { get; set; }
    public decimal CostDay { get; set; }
    public string? CarImage { get; set; }
    public bool IsDeleted { get; set; }
}