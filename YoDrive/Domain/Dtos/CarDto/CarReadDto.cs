using YoDrive.Domain.Dtos.CarClassDto;
using YoDrive.Domain.Dtos.FilialDto;
using YoDrive.Domain.Dtos.ModelDto;
using YoDrive.Domain.Dtos.RentDto;
using YoDrive.Domain.Enums;
using YoDrive.Domain.Models;

namespace YoDrive.Domain.Dtos.CarDto;

public class CarReadDto
{
    public int CarId { get; set; }
    public CarModelReadDto CarModel { get; set; }
    public ClassReadDto CarClass { get; set; }
    public FilialReadDto Filial { get; set; }
    public IEnumerable<RentReadDto>? Rents { get; set; }
    public int FeedbackCount { get; set; }
    public int Year { get; set; }
    public double Rating { get; set; } 
    public GearBox GearBox { get; set; }
    public decimal CostDay { get; set; }
    public string? CarImage { get; set; }
    public byte[]? Image { get; set; }
}