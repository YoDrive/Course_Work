using YoDrive.Domain.Dtos.CarBrandDto;

namespace YoDrive.Domain.Dtos.ModelDto;

public class CarModelReadDto
{
    public int CarModelId { get; set; }
    public CarBrandReadDto CarBrand { get; set; }
    public string ModelName { get; set; }
}