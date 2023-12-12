using YoDrive.Domain.Dtos.CarDto;

namespace YoDrive.Domain.Other;

public class CarResponsePage
{
    public int Count { get; set; }
    public IEnumerable<CarReadDto> Items { get; set; }
}