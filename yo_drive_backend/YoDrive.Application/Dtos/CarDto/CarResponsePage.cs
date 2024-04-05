using System.Collections.Generic;

namespace YoDrive.Application.Dtos.CarDto;

public class CarResponsePage
{
    public int Count { get; set; }
    public IEnumerable<CarReadDto> Items { get; set; }
}