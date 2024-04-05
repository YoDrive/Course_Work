using System.Collections.Generic;
using YoDrive.Domain.Enums;
using YoDrive.Application.Dtos.CarClassDto;
using YoDrive.Application.Dtos.FilialDto;
using YoDrive.Application.Dtos.ModelDto;
using YoDrive.Application.Dtos.RentDto;

namespace YoDrive.Application.Dtos.CarDto;

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