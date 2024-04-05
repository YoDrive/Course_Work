using YoDrive.Application.Dtos.CarBrandDto;

namespace YoDrive.Application.Dtos.ModelDto;

public class CarModelReadDto
{
    public int CarModelId { get; set; }
    public CarBrandReadDto CarBrand { get; set; }
    public string ModelName { get; set; }
}